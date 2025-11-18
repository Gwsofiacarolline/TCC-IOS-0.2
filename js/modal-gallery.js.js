document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os elementos de modal
    const allModals = document.querySelectorAll('.modal');

    // --- Configurações de Tamanho Padronizado ---
    const THUMBNAIL_SIZE = '80px'; // Tamanho padronizado para miniaturas (largura e altura)
    // ------------------------------------------

    allModals.forEach(modal => {
        
        // Monitora o evento de abertura do modal (depois que a transição termina)
        modal.addEventListener('shown.bs.modal', function () {
            // Encontra a imagem principal (grande) e as miniaturas dentro deste modal
            const mainImage = modal.querySelector('img[id^="main-product-image-"]');
            const thumbnails = modal.querySelectorAll('.thumbnail');

            if (mainImage && thumbnails.length > 0) {
                
                // 1. PADRONIZAÇÃO DA IMAGEM PRINCIPAL (OPCIONAL, MAS RECOMENDADO)
                // Garante que a imagem principal se ajuste ao espaço sem deformar.
                // Aqui estamos forçando a imagem principal a ter no máximo 100% da largura do contêiner e a se ajustar.
                mainImage.style.maxWidth = '100%'; 
                mainImage.style.height = 'auto';
                mainImage.style.objectFit = 'contain'; 
                mainImage.style.borderRadius = '0.25rem'; // Adiciona o arredondamento do Bootstrap

                // 2. Configura o clique em cada miniatura E APLICA O ESTILO PADRÃO
                thumbnails.forEach(thumbnail => {
                    
                    // PADRONIZAÇÃO DAS MINIATURAS: FORÇA O TAMANHO QUADRADO E O AJUSTE
                    thumbnail.style.width = THUMBNAIL_SIZE;
                    thumbnail.style.height = THUMBNAIL_SIZE;
                    thumbnail.style.objectFit = 'cover'; // Garante que a imagem preencha o quadrado (cortando o excesso)
                    
                    // Código original para troca de imagem
                    const clickHandler = function () {
                        // 1. Remove a classe 'active' de todas as miniaturas
                        thumbnails.forEach(t => t.classList.remove('active'));
                        // 2. Adiciona 'active' à miniatura clicada
                        this.classList.add('active');
                        // 3. Atualiza a imagem principal com o caminho do data-full-src
                        mainImage.src = this.dataset.fullSrc;
                    };

                    // Garante que o evento seja adicionado apenas uma vez, limpando se já existir
                    if (thumbnail.clickHandler) {
                        thumbnail.removeEventListener('click', thumbnail.clickHandler);
                    }
                    thumbnail.clickHandler = clickHandler; // Armazena a função no elemento
                    thumbnail.addEventListener('click', thumbnail.clickHandler);
                });

                // Garante que a imagem principal correta (a primeira) seja carregada ao abrir o modal
                if (thumbnails[0]) {
                    // Simula o clique na primeira miniatura para iniciar a galeria
                    thumbnails[0].click();
                }
            }
        });

        // Monitora o evento de fechamento do modal (código original)
        modal.addEventListener('hidden.bs.modal', function () {
            const thumbnails = modal.querySelectorAll('.thumbnail');

            if (thumbnails.length > 0) {
                // Remove a classe 'active' de todos ao fechar
                thumbnails.forEach(t => t.classList.remove('active'));
                // Adiciona a classe 'active' apenas na primeira, preparando para a próxima abertura
                if (thumbnails[0]) {
                    thumbnails[0].classList.add('active');
                }
            }
        });
    });
});