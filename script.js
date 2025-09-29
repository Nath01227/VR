function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Raio da Terra em metros
    const toRad = deg => deg * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em metros
  }

  const maxDistance = 0.5; // Distância máxima em metros

  // Função para atualizar a visibilidade dos modelos
  function updateModelVisibility() {
    const camera = document.querySelector('[gps-camera]');
    if (!camera || !camera.components['gps-camera'].currentCoords) return;

    const userCoords = camera.components['gps-camera'].currentCoords;

    // Itera sobre todos os elementos com o componente gps-entity-place
    document.querySelectorAll('[gps-entity-place]').forEach(entity => {
      const { latitude, longitude } = entity.components['gps-entity-place'].data;
      const distance = getDistance(userCoords.latitude, userCoords.longitude, latitude, longitude);
      entity.object3D.visible = distance <= maxDistance; // Define a visibilidade com base na distância
    });
  }

  // Atualiza a visibilidade a cada segundo
  setInterval(updateModelVisibility, 1000);