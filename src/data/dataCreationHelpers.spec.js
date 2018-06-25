import places from './california/californiaPlaces';
import * as routeTypes from './default/routeTypes';
import {DEFAULT_SERVICE} from './default/services';
import * as stopTypes from './default/stopTypes';
import {
  createRoute, createRouteId, createService, createStop, createStopId, createStopTimes, createTrip, createTripId,
  createTripWithStopTimesPair, FROM_TO_DIRECTION,
  orderStops, TO_FROM_DIRECTION,
} from './dataCreationHelpers';
import {EAST_BAY} from './california/californiaRegions';
import {stopResolver} from './dataQueryHelpers';
import {AMTRAK, CENTRAL, TRANSBAY, UNION} from './california/californiaStops';

describe('Data Creation Helpers', () => {
    test('Creates a Stop id from a Place and Stop location', () => {
        expect(createStopId(places.LOS_ANGELES, UNION)).toMatchSnapshot();
    });

    test('Creates a Stop', () => {
        expect(createStop(
            places.LOS_ANGELES, UNION, {lon: -118.236502, lat: 34.056219}
        )).toMatchSnapshot();
        expect(createStop(
            places.LOS_ANGELES, UNION, {lon: -118.236502, lat: 34.056219},
            {stopName: 'LA Fancy Station'}
        )).toMatchSnapshot();
        expect(createStop(
            places.LOS_ANGELES, UNION, {lon: -118.236502, lat: 34.056219},
            {stopType: 'MegaStation'}
        )).toMatchSnapshot();
    });

    test('Creates a Route id', () => {
        expect(createRouteId(places.LOS_ANGELES, places.RENO)).toMatchSnapshot();
        expect(createRouteId(places.LOS_ANGELES, places.RENO, EAST_BAY)).toMatchSnapshot();
    });

    test('Creates a Route', () => {
        expect(createRoute(places.LOS_ANGELES, places.RENO,
            {routeType: routeTypes.INTER_REGIONAL_RAIL_SERVICE})).toMatchSnapshot();
        expect(createRoute(places.LOS_ANGELES, places.RENO,
            {via: EAST_BAY, routeType: routeTypes.REPLACEMENT_RAIL_SERVICE})).toMatchSnapshot();
    });

    test('Creates a Service', () => {
        expect(createService('20170601', '20170831', ['weekend'], ['summer'])).toMatchSnapshot();
    });

    test('Creates a Trip id', () => {
        const route = createRoute(places.LOS_ANGELES, places.RENO,
            {routeType: routeTypes.INTER_REGIONAL_RAIL_SERVICE});
        expect(createTripId(route, FROM_TO_DIRECTION, DEFAULT_SERVICE)).toMatchSnapshot();
    });

    test('Creates Trip', () => {
        const route = createRoute(places.LOS_ANGELES, places.RENO,
            {routeType: routeTypes.INTER_REGIONAL_RAIL_SERVICE});
        expect(createTrip(route, FROM_TO_DIRECTION, DEFAULT_SERVICE)).toMatchSnapshot();
    });
});

describe('Trips with Stops', () => {
    const route = createRoute(places.LOS_ANGELES, places.RENO,
        {routeType: routeTypes.INTER_REGIONAL_RAIL_SERVICE});
    const trip = createTrip(route, TO_FROM_DIRECTION, DEFAULT_SERVICE);
    const resolveStop = stopResolver([
        createStop(places.LOS_ANGELES, UNION,
            { lon: -118.236502, lat: 34.056219 },
        ),
        createStop(places.OAKLAND, CENTRAL,
            { lon: -122.277158, lat: 37.806624 },
        ),
        createStop(places.RENO, AMTRAK,
            { lon: -122.041192, lat: 38.243449 }
        ),
        createStop(places.SACRAMENTO, AMTRAK,
            { lon: -121.500675, lat: 38.584162 }
        ),
        createStop(places.SAN_FRANCISCO, TRANSBAY,
            { lon: -122.392481, lat: 37.789339 },
            { stopType: stopTypes.TERMINAL }
        ),
        createStop(places.STOCKTON, AMTRAK,
            { lon: -121.285602, lat: 37.945332 }
        ),
        createStop(places.TRUCKEE, AMTRAK,
            { lon: -120.185620, lat: 39.327493 },
            { stopType: stopTypes.DEPOT }
        )
    ]);

    test('Orders Stops of a Trip', () => {
        expect(orderStops(trip, [
            resolveStop(places.SAN_FRANCISCO, TRANSBAY),
            resolveStop(places.OAKLAND, CENTRAL),
            resolveStop(places.STOCKTON, AMTRAK),
            resolveStop(places.SACRAMENTO, AMTRAK),
            resolveStop(places.TRUCKEE, AMTRAK),
            resolveStop(places.RENO, AMTRAK)
        ])).toMatchSnapshot();
    });

    test('Creates Trips with Stop Times Pair', () => {
        expect(createTripWithStopTimesPair(route, DEFAULT_SERVICE,
            oneTrip => {
                return createStopTimes(
                    oneTrip,
                    orderStops(oneTrip, [
                        resolveStop(places.SAN_FRANCISCO, TRANSBAY),
                        resolveStop(places.OAKLAND, CENTRAL),
                        resolveStop(places.STOCKTON, AMTRAK),
                        resolveStop(places.SACRAMENTO, AMTRAK),
                        resolveStop(places.TRUCKEE, AMTRAK),
                        resolveStop(places.RENO, AMTRAK)
                    ]),
                    '09:10', '12:20', 60);
        })).toMatchSnapshot();
    });
});

