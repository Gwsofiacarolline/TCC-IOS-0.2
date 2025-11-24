document.addEventListener('DOMContentLoaded', () => {
    // Referencia os novos IDs dos campos no HTML
    const cep = document.querySelector('#cep');
    const rua = document.querySelector('#rua');
    const bairro = document.querySelector('#bairro');
    const cidade = document.querySelector('#cidade');
    const message = document.querySelector('#message');

    // Evento para quando o campo CEP perde o foco
    cep.addEventListener('focusout', () => {
        const cepValue = cep.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        
        // Adiciona feedback visual enquanto busca
        if (cepValue.length === 8) {
            message.textContent = "Buscando endereço...";
            message.style.color = "gray";
        }
        
        if (cepValue.length === 8) { // Verifica se o CEP tem 8 dígitos
            // Usa template string para a URL da API
            fetch(`https://viacep.com.br/ws/${cepValue}/json/`) 
                .then(response => response.json())
                .then(data => {
                    if (data.erro) {
                        message.textContent = "CEP não encontrado!";
                        message.style.color = "red";
                        rua.value = '';
                        bairro.value = '';
                        cidade.value = '';
                    } else {
                        rua.value = data.logradouro;
                        bairro.value = data.bairro;
                        cidade.value = data.localidade;
                        message.textContent = "Endereço preenchido automaticamente."; 
                        message.style.color = "green";
                    }
                })
                .catch(error => {
                    message.textContent = "Erro ao buscar CEP. Tente novamente.";
                    message.style.color = "red";
                });
        } else if (cepValue.length > 0) {
            message.textContent = "CEP inválido! Digite 8 números.";
            message.style.color = "red";
        } else {
            message.textContent = "";
        }
    });
});
