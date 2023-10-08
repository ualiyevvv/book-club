import React, {useEffect, useRef, useState} from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol';
import markerIcon from './images/marker-icon.png';
import markerIcon2x from './images/marker-icon-2x.png';
import jsonData from './geoJson.json';

import styles from './map.module.css'


import EventCardMap from "../event/event_card_map/EventCardMap";

// import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

export default function Leaflet({markersData}) {
    const eventsInfo = {
        caption: 'Митап для QA инженеров от KoronaPay',
        description: `🌟 Meetup: "Визуализация данных при помощи WebGL"
⠀
🔍 Хочешь погрузиться в мир визуализации данных в вебе? Тогда этот митап именно для тебя! Присоединяйся к нам и узнай все об особенностях и применении WebGL.
⠀
🎙Эксперт в этой области – Роман Башарин поделится практическими примерами применения WebGL в проектах из сферы drug research.
⠀
Роман уже более 10 лет в IT, работал над десятками приложений в сферах от e-commerce до фондов благотворительности. Написал 5 собственных фреймворков, прежде чем достиг просветления и начал использовать готовые.
⠀
🏢 Quantori — ведущая международная IT-компания в области здравоохранения и медицинской биологии, создает интеллектуальные проекты, применяя инновационные технологии и научную экспертизу.
⠀
Не упусти шанс узнать о популярных способах визуализации данных в web, научиться работать с 3D и WebGL, а также погрузиться в мир Life Science разработки.
⠀
❗️ Регистрируйся на митап по ссылке https://forms.amocrm.ru/rrdwvxm`,
        start_date: '21 сентября',
        address: "Astana Hub (Астана, пр-т. Мангилик Ел. 55/8, павильон С4.6), зал Event hall",
        end_date: '31 октября',
        registration_deadline: '',
        cost: null
    }

    const geoPosition = [51.11170294584818,71.40717028568645]
    const mapContainerRef = useRef();
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        // Создание карты и установка начальных координат и масштаба
        const map = L.map(mapContainerRef.current).setView(geoPosition, 11);

        // Добавление тайлового слоя OpenStreetMap
        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: 'Map data &copy; OpenStreetMap contributors',
        // }).addTo(map);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: false,
        }).addTo(map);

        // Add the geolocation control
        L.control
            .locate({
                position: 'topright',
                locateOptions: {
                    enableHighAccuracy: true,
                },
                markerStyle: {
                    draggable: true,
                    opacity: 0.5,
                },
                circleStyle: {
                    radius: 200,
                    weight: 2,
                    color: 'blue',
                    fillColor: 'blue',
                    fillOpacity: 0.1,
                },
            })
            .addTo(map);


        // Create a marker cluster group
        const markers = L.markerClusterGroup();


        // Создание иконки маркера
        const customIcon = L.icon({
            iconUrl: markerIcon,
            iconRetinaUrl: markerIcon2x,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null,
        });

        markersData.forEach((markerData) => {
            const { caption, coordinates } = markerData;
            const marker = L.marker(coordinates, {icon: customIcon}).bindPopup(caption);

            marker.on('click', () => {
                // Handle the click event here
                setSelectedEvent(markerData)
                console.log('Marker clicked:', caption);
            });

            markers.addLayer(marker);
        });

        // Добавление слоя GeoJSON в слой с кластеризацией
        // markers.addLayer(geojsonLayer);
        // Add markers to the cluster group
        // const marker1 = L.marker([51.5, -0.09]).bindPopup('Marker 1');
        // const marker2 = L.marker([51.51, -0.1]).bindPopup('Marker 2');
        // const marker3 = L.marker([51.49, -0.08]).bindPopup('Marker 3');
        // markers.addLayers([marker1, marker2, marker3]);

        // Add the marker cluster group to the map
        map.addLayer(markers);
        // map.addLayer(markers);
        // console.log("valueNames", valueNames);
        return () => {
            // Очистка карты при размонтировании компонента
            map.remove();
        };
    }, []);

    return (<div style={{height: '100%'}}>
        <div ref={mapContainerRef} style={{ height: '90.8%' }}></div>
        {selectedEvent && <EventCardMap item={selectedEvent} />}
    </div>)
}
