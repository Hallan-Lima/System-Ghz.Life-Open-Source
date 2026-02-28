# 🏗️ Guia de Desenvolvimento: Criando Novas Funcionalidades

Bem-vindo ao guia de desenvolvimento do **Ghz.Life**! Este documento foi feito para desmistificar a estrutura do projeto. Se você quer adicionar um módulo de "Atividade Física", "Leitura" ou "Investimentos", siga este roteiro.

---

## 1. A Filosofia do Projeto (A "Receita de Bolo")

Neste projeto, não misturamos tudo em uma pasta só. Usamos a **Arquitetura Baseada em Features**.
Imagine que cada funcionalidade (Finanças, Saúde, Tarefas) é uma **peça de Lego independente**.

Cada peça (Feature) tem sempre a mesma estrutura interna:

-   **`types.ts`**: O "Dicionário". Define o formato dos dados (ex: O que é um "Treino"?).
-   **`data.ts`**: Os "Dados de Mentirinha" (Mocks). Usamos para desenhar a tela antes de ter o Banco de Dados pronto.
-   **`services/`**: O "Garçom". É quem busca os dados (seja do Mock ou do Banco de Dados) e entrega para o código.
-   **`hooks/`**: O "Cérebro". Onde fica a lógica (somar valores, marcar como feito, carregar dados).
-   **`components/`**: A "Roupa". Botões, cards e visuais específicos dessa funcionalidade.
-   **`[Nome]View.tsx`**: O "Palco". Onde juntamos tudo para exibir na tela.

---

## 2. Tutorial Prático: Criando o Módulo "Atividade Física" 🏋️

Vamos criar um módulo para registrar treinos de academia.

### Passo 1: Crie a Pasta
Crie a pasta `src/features/activity`.

### Passo 2: Defina os Tipos (`activity.types.ts`)
Primeiro, definimos o que compõe uma atividade.

```typescript
// src/features/activity/activity.types.ts
export interface Workout {
  id: string;
  name: string;      // ex: "Treino de Peito"
  duration: number;  // em minutos
  calories: number;  // kcal gastas
  date: string;
}
```

### Passo 3: Crie Dados de Teste (`activity.data.ts`)
Para não travar esperando o backend, criamos dados falsos.

```typescript
// src/features/activity/activity.data.ts
import { Workout } from "./activity.types";

export const workoutMocks: Workout[] = [
  { id: '1', name: 'Corrida Matinal', duration: 30, calories: 300, date: 'Hoje' },
  { id: '2', name: 'Musculação', duration: 60, calories: 450, date: 'Ontem' },
];
```

### Passo 4: Crie o Serviço (`services/activity.service.ts`)
O serviço simula uma chamada de rede.

```typescript
// src/features/activity/services/activity.service.ts
import { workoutMocks } from "../activity.data";
import { Workout } from "../activity.types";

export const activityService = {
  getWorkouts: async (): Promise<Workout[]> => {
    // Simulando um delay de internet
    // await new Promise(resolve => setTimeout(resolve, 500));
    return workoutMocks;
  }
};
```

### Passo 5: Crie a Lógica (`hooks/useActivity.ts`)
O Hook conecta o serviço à tela e gerencia o estado.

```typescript
// src/features/activity/hooks/useActivity.ts
import { useState, useEffect } from "react";
import { activityService } from "../services/activity.service";
import { Workout } from "../activity.types";

export const useActivity = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await activityService.getWorkouts();
      setWorkouts(data);
      setLoading(false);
    };
    load();
  }, []);

  return { workouts, loading };
};
```

### Passo 6: Crie a Tela (`components/ActivityView.tsx`)
Agora desenhamos a tela usando a lógica criada.

```typescript
// src/features/activity/components/ActivityView.tsx
import React from "react";
import Layout from "../../../components/Layout";
import { useActivity } from "../hooks/useActivity";

const ActivityView: React.FC = () => {
  const { workouts, loading } = useActivity();

  return (
    <Layout title="Meus Treinos">
      {loading ? <p>Carregando...</p> : (
        <div className="space-y-4">
          {workouts.map(treino => (
            <div key={treino.id} className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="font-bold">{treino.name}</h3>
              <p className="text-sm text-gray-500">{treino.duration} min • {treino.calories} kcal</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default ActivityView;
```

### Passo 7: Registre a Rota (`App.tsx`)
Por fim, adicione a rota no arquivo principal.

```typescript
// App.tsx
// ... imports
import ActivityView from './features/activity/components/ActivityView';

// ... dentro das Routes
<Route path="/activity" element={<ActivityView />} />
```

---

## 3. Integração com Banco de Dados (O Mundo Real) 🗄️

Atualmente, usamos dados "Mocados" (`.data.ts`). Para conectar com um banco real (como Firebase, Supabase ou API própria), você **só precisa alterar o arquivo Service**.

A mágica desta arquitetura é que **você não precisa mudar a Tela (View) nem a Lógica (Hook)**.

### Exemplo: Mudando de Mock para API Real

Vá em `services/activity.service.ts`:

**ANTES (Mock):**
```typescript
getWorkouts: async () => {
  return workoutMocks; // Retorna array fixo
}
```

**DEPOIS (API Real com fetch):**
```typescript
getWorkouts: async () => {
  // Chama seu backend real
  const response = await fetch('https://api.meusite.com/treinos');
  const data = await response.json();
  
  // O retorno deve respeitar a interface Workout definida nos types
  return data; 
}
```

**DEPOIS (Supabase Example):**
```typescript
import { supabase } from '../../../lib/supabase'; // Exemplo

getWorkouts: async () => {
  const { data, error } = await supabase.from('workouts').select('*');
  if (error) throw error;
  return data;
}
```

---

## 4. Integrando Outras APIs (Ex: Nutrição/Clima) 🌐

Se quiser adicionar uma API externa (ex: API de Nutrição para contar calorias), siga o padrão do Service.

1.  Defina a chave da API no arquivo `.env`:
    ```env
    NUTRITION_API_KEY=sua_chave_aqui
    ```

2.  Crie um método no seu service:

```typescript
// services/nutrition.service.ts
export const nutritionService = {
  getCalories: async (foodName: string) => {
    const apiKey = import.meta.env.VITE_NUTRITION_API_KEY;
    const response = await fetch(`https://api.nutrition.com/v1/calorias?q=${foodName}&key=${apiKey}`);
    return await response.json();
  }
}
```

3.  Use esse service dentro do seu Hook e mostre na tela.

---

## 5. Dicas de Ouro 🌟

1.  **Componentes Burros:** Se você criou um Card de Treino, coloque-o em `features/activity/components/WorkoutCard.tsx`. Se esse card for muito genérico e puder ser usado em Finanças também, mova para `src/components/ui`.
2.  **Mobile First:** Sempre desenvolva pensando na tela do celular primeiro. Use as classes do Tailwind como `w-full` e `p-4`.
3.  **Ícones:** O projeto já tem FontAwesome instalado. Basta usar `<i className="fas fa-dumbbell"></i>`.

---
**Autor:** HallTech AI
**Data:** 2023
