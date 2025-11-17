
function realizarBusca() {
    const termo = document.getElementById('campoBusca').value.trim();
    if (!termo) {
        alert('Digite algo para buscar.');
        return;
    }
    // Aqui você define o comportamento real da busca
    alert('Buscando por: ' + termo);
}
