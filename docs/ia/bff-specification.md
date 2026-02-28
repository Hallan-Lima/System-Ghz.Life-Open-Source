
# Especificação Técnica: Ghz.Life BFF (.NET 8 + MySQL)

## 1. Visão Geral e Objetivo
Este documento serve como blueprint para o desenvolvimento do **Backend for Frontend (BFF)** da aplicação Ghz.Life.
O objetivo deste serviço é atuar como mediador entre a interface React (Frontend) e o banco de dados MySQL, centralizando regras de negócio, validações, segurança e formatação de dados.

### Stack Tecnológica
- **Runtime:** .NET 8 (C#)
- **Framework Web:** ASP.NET Core Web API
- **Banco de Dados:** MySQL 8.0
- **ORM:** Entity Framework Core 8 (com `Pomelo.EntityFrameworkCore.MySql`)
- **Documentação:** Swagger/OpenAPI

---

## 2. Arquitetura da Solução

O projeto deve seguir uma arquitetura em camadas para garantir a separação de responsabilidades e testabilidade.

### Estrutura de Pastas Sugerida
```text
src/
├── GhzLife.API/           # Controllers e Configuração
├── GhzLife.Application/   # DTOs, Services, Interfaces de Serviço
├── GhzLife.Domain/        # Entidades, Enums, Interfaces de Repositório
└── GhzLife.Infrastructure/# EF Core Context, Repositories, Migrations
```

### Padrão de Design
- **Repository Pattern:** Para abstrair o acesso a dados.
- **Service Layer:** Para encapsular as regras de negócio (ex: lógica de conclusão de metas).
- **Controller:** Apenas para receber requisições, chamar serviços e retornar `IActionResult`.

---

## 3. Mapeamento de Banco de Dados (MySQL)

A tabela principal para este escopo será a `AppTasks`. Utilizaremos a estratégia de *Single Table Inheritance* (ou tabela única genérica) para acomodar todos os tipos de itens do frontend (Tarefas, Metas, Sonhos, Compras, Notas), diferenciados por um campo `Type`.

### Tabela: `AppTasks`

| Coluna | Tipo MySQL | Tipo C# | Descrição |
| :--- | :--- | :--- | :--- |
| `Id` | CHAR(36) PK | `Guid` | Identificador único (UUID). |
| `Title` | VARCHAR(255) | `string` | Título da tarefa. Obrigatório. |
| `Type` | VARCHAR(50) | `TaskType` (Enum) | DAILY, GOAL, DREAM, SHOPPING, NOTE. |
| `Priority` | VARCHAR(20) | `TaskPriority` (Enum) | LOW, MEDIUM, HIGH. |
| `IsCompleted` | TINYINT(1) | `bool` | Status de conclusão. |
| `IsPinned` | TINYINT(1) | `bool` | Se o item está fixado no topo. |
| `DueDate` | DATETIME | `DateTime?` | Prazo final (opcional). |
| `Content` | TEXT | `string?` | Notas, descrições ou conteúdo rico. |
| `Tags` | JSON | `string?` | Array de strings serializado ou JSON nativo. |
| `TargetValue` | DECIMAL(18,2) | `decimal?` | Valor alvo (para Metas/Sonhos). |
| `CurrentValue` | DECIMAL(18,2) | `decimal?` | Valor atual (progresso). |
| `EstimatedCost` | DECIMAL(18,2) | `decimal?` | Custo estimado (para Shopping). |
| `Unit` | VARCHAR(20) | `string?` | Unidade de medida (BRL, kg, un). |
| `Recurrence` | VARCHAR(20) | `string?` | daily, weekly, etc. |
| `CreatedAt` | DATETIME | `DateTime` | Data de criação. |
| `UpdatedAt` | DATETIME | `DateTime?` | Data da última atualização. |
| `DeletedAt` | DATETIME | `DateTime?` | Para Soft Delete. |

---

## 4. Contratos de Dados (DTOs)

Os DTOs devem ser definidos na camada `Application` para garantir que a API receba e retorne JSONs estritamente tipados.

### Enums
```csharp
public enum TaskType { DAILY, GOAL, DREAM, SHOPPING, NOTE }
public enum TaskPriority { LOW, MEDIUM, HIGH }
```

### 4.1. TaskResponseDTO (Output)
Usado para listagem e detalhes (GET).
```csharp
public class TaskResponseDTO
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Type { get; set; } // Retornar como string para o front
    public string Priority { get; set; }
    public bool Completed { get; set; } // Mapear de IsCompleted
    public bool IsPinned { get; set; }
    public DateTime? DueDate { get; set; }
    public string Content { get; set; }
    public List<string> Tags { get; set; }
    
    // Propriedades específicas de Metas/Sonhos
    public decimal? TargetValue { get; set; }
    public decimal? CurrentValue { get; set; }
    public int? Progress { get; set; } // Calculado: (Current / Target) * 100
    public string Unit { get; set; }
    
    // Propriedades específicas de Shopping
    public decimal? EstimatedCost { get; set; }
}
```

### 4.2. CreateTaskDTO (Input)
Usado para criação (POST).
```csharp
public class CreateTaskDTO
{
    [Required]
    public string Title { get; set; }
    
    [Required]
    public TaskType Type { get; set; } // Binder deve aceitar string e converter enum
    
    public TaskPriority Priority { get; set; } = TaskPriority.MEDIUM;
    public DateTime? DueDate { get; set; }
    public string? Content { get; set; }
    public List<string>? Tags { get; set; }
    
    // Metas/Shopping
    public decimal? TargetValue { get; set; }
    public decimal? CurrentValue { get; set; }
    public decimal? EstimatedCost { get; set; }
    public string? Unit { get; set; } = "un";
    public string? Recurrence { get; set; }
}
```

### 4.3. UpdateTaskDTO (Input)
Usado para edição completa (PUT). Semelhante ao Create, mas todos opcionais ou obrigatórios conforme regra de negócio (geralmente obrigatórios para PUT).

---

## 5. Endpoints e Lógica de Negócio (TasksController)

O Controller deve injetar `ITaskService`.

### 5.1. Listar Tarefas
- **Verbo:** `GET /api/tasks`
- **Query Params:** `?type=DAILY&status=pending`
- **Lógica:** Retornar lista filtrada onde `DeletedAt` é NULL.

### 5.2. Criar Tarefa
- **Verbo:** `POST /api/tasks`
- **Body:** `CreateTaskDTO`
- **Lógica:** 
    - Mapear DTO para Entidade.
    - Definir `CreatedAt = DateTime.UtcNow`.
    - Definir `IsCompleted = false`.
    - Salvar no banco.
    - Retornar `201 Created` com `TaskResponseDTO`.

### 5.3. Atualizar Tarefa
- **Verbo:** `PUT /api/tasks/{id}`
- **Body:** `UpdateTaskDTO`
- **Lógica:** Atualizar campos e `UpdatedAt`.

### 5.4. Alternar Conclusão (Patch)
- **Verbo:** `PATCH /api/tasks/{id}/toggle`
- **Lógica Específica (Regra de Ouro):**
    1. Buscar tarefa.
    2. Inverter `IsCompleted = !IsCompleted`.
    3. **Se for GOAL ou DREAM:**
        - Se `IsCompleted` virou `true`: Definir `CurrentValue = TargetValue` (Forçar 100%).
        - Se `IsCompleted` virou `false`: Manter `CurrentValue` (ou não alterar, dependendo da regra de negócio, mas geralmente mantém o último valor conhecido).

### 5.5. Atualizar Progresso (Patch)
- **Verbo:** `PATCH /api/tasks/{id}/progress`
- **Body:** `{ "value": 150.00 }`
- **Lógica:**
    1. Atualizar `CurrentValue`.
    2. Se `CurrentValue >= TargetValue`, definir `IsCompleted = true`.
    3. Se `CurrentValue < TargetValue`, definir `IsCompleted = false`.

### 5.6. Excluir Tarefa
- **Verbo:** `DELETE /api/tasks/{id}`
- **Lógica:** **Soft Delete**.
    - Não remover o registro do banco.
    - Definir `DeletedAt = DateTime.UtcNow`.
    - Filtrar registros com `DeletedAt != null` nas consultas GET.

---

## 6. Padrão de Resposta da API

Para facilitar o consumo pelo Frontend React (Axios), todas as respostas devem seguir este envelope JSON:

```json
{
  "success": true,
  "data": { ... }, // Objeto ou Array
  "message": "Operação realizada com sucesso.",
  "errors": [] // Array de strings em caso de erro 400/500
}
```

### Exemplo de Erro (400 Bad Request)
```json
{
  "success": false,
  "data": null,
  "message": "Falha na validação.",
  "errors": [
    "O campo 'Title' é obrigatório.",
    "A data de vencimento não pode ser no passado."
  ]
}
```

## 7. Configuração do Entity Framework (Infrastructure)

Ao configurar o `DbContext`:

1.  Usar `modelBuilder.Entity<AppTask>().HasQueryFilter(t => t.DeletedAt == null);` para aplicar o Soft Delete globalmente.
2.  Configurar conversão de Enums para String no banco (para legibilidade no MySQL Workbench):
    ```csharp
    modelBuilder.Entity<AppTask>()
        .Property(t => t.Type)
        .HasConversion<string>();
    ```

## 8. Segurança e CORS

- Habilitar **CORS** para permitir requisições de `http://localhost:5173` (Ambiente de Dev do Vite) e do domínio de produção.
- Sanitizar inputs para evitar SQL Injection (garantido pelo EF Core, mas validar strings no DTO).

