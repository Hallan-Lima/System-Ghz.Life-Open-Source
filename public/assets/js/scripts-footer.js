document.addEventListener('DOMContentLoaded', function () {
    const saldoValue = document.getElementById('saldo-value');
    const toggleSaldo = document.getElementById('toggle-saldo');
    let isVisible = false;
  
    toggleSaldo.addEventListener('click', function () {
        isVisible = !isVisible;
        if (isVisible) {
        saldoValue.textContent = 'R$ 1.000,00';
        toggleSaldo.innerHTML = '<i class="bx bx-hide bx-sm"></i>';
        } else {
        saldoValue.textContent = '****';
        toggleSaldo.innerHTML = '<i class="bx bx-show bx-sm"></i>';
        }
    });
    });


document.getElementById('recorrencia').addEventListener('change', function () {
    const customFields = document.querySelectorAll('#recorrenciaCustomizada, #recorrenciaUnidade');
    if (this.value === 'customizado') {
        customFields.forEach(field => field.classList.remove('d-none'));
    } else {
        customFields.forEach(field => field.classList.add('d-none'));
    }
});
    