window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Fantasmas',
            location: {
                lat: -23.330280,
                lng: -47.845248,
            },
        },
    ];
}

var models = [
    {
        url: './assets/ghost_girl_animated/scene.gltf',
        scale: '0.3 0.3 0.3',
        rotation: '0 180 0',
    },
    {
        url: '.assets/ghost/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
    },
    {
        url: './assets/3december_-fantasy_ghost/scene.gltf',
        scale: '0.5 0.5 0.5',
        rotation: '0 180 0',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}