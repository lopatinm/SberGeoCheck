import { Component } from '@angular/core';
interface GeoObjectConstructor {
  feature: ymaps.IGeoObjectFeature;
  options: ymaps.IGeoObjectOptions;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  geoObject: GeoObjectConstructor = {
    feature: {
      // The geometry description.
      geometry: {
        type: 'Point',
        coordinates: [62.026734, 129.737444],
      },
      // Properties.
      properties: {
        // The placemark content.
        iconContent: "I'm draggable",
        hintContent: 'Come on, drag already!',
      },
    },
    options: {
      /**
       * Options.
       * The placemark's icon will stretch to fit its contents.
       */
      preset: 'islands#blackStretchyIcon',
      // The placemark can be dragged.
      draggable: true,
    },
  };
}
