AFRAME.registerComponent("static-anchor", {
    init: function () {
      const el = this.el;
      const eventName = "gps-entity-place-update-positon";
      el.addEventListener(
        eventName,
        (event) => {
          const distance = event.detail && event.detail.distance;
          console.log("Initial placement distance:", distance);
          const gpsComp =
            el.components["gps-new-entity-place"] ||
            el.components["gps-entity-place"];
          if (gpsComp && gpsComp._updatePosition) {
            gpsComp._updatePosition = function () {
            };
          }
        },
        { once: true }
      );
    },
  });