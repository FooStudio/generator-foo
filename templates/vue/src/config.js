/**
 * Created by mendieta on 1/20/16.
 */

const stagingRoute = "/clients/foo/boilerplate";
const stagingURL = "http://www.fooprojects.com" + stagingRoute;

const qaRoute = "/clients/foo/boilerplate";
const qaURL = "http://www.fooprojects.com" + qaRoute;

const productionRoute = "/";
const productionURL = "http://www.client.com" + productionRoute;

const developmentRoute = "/";
const developmentURL = "http://localhost:8080" + developmentRoute;

const apiEndPoint = "/endpoint/";

//CONFIG
const config = {
    "locale": "es-MX",
    "analytics": ["google"],
    "data_loading": true,
    "asset_loading": true,
    "facebook_permissions": "email",
    "google_scopes": "https://www.googleapis.com/auth/plus.login",
    "xeerpa_presist": true,
    "apis": {
        "facebook": true,
        "google": false,
        "twitter": false,
        "xeerpa": true,
    },
    "vars": {
        "animate": true,
        "resize": true
    },
    "urls": {},
    "environments": {
        "production": {
            "vars": {
                "base": productionURL,
                "route": productionRoute,
                "routerMode": "hash",
                "sentry": true,
                "debug": false
            },
            "urls": {
                "api": productionURL + apiEndPoint
            },
            "properties": {
                "fb": "144062099411527",
                "ga": "ua2423423",
                "gp": "1015126163676-t0vmcvjts8t11vb85k0gs1u3e5lj2hfe.apps.googleusercontent.com",
                "xeerpa": "https://indio.com.mx/agegate/socialLogin/socialLoginCallback.php",
            }
        },
        "staging": {
            "vars": {
                "base": stagingURL,
                "route": stagingRoute,
                "routerMode": "hash",
                "sentry": true,
                "debug": true
            },
            "urls": {
                "api": stagingURL + apiEndPoint
            },
            "properties": {
                "fb": "144062099411527",
                "ga": "ua2423423",
                "gp": "1015126163676-t0vmcvjts8t11vb85k0gs1u3e5lj2hfe.apps.googleusercontent.com",
                "xeerpa": "https://indio.com.mx/agegate/socialLogin/socialLoginCallback.php",
            }
        },
        "qa": {
            "vars": {
                "base": qaURL,
                "route": qaRoute,
                "routerMode": "hash",
                "sentry": true,
                "debug": true
            },
            "urls": {
                "api": qaURL + apiEndPoint
            },
            "properties": {
                "fb": "144062099411527",
                "ga": "ua2423423",
                "gp": "1015126163676-t0vmcvjts8t11vb85k0gs1u3e5lj2hfe.apps.googleusercontent.com",
                "xeerpa": "https://indio.com.mx/agegate/socialLogin/socialLoginCallback.php",
            }
        },
        "development": {
            "vars": {
                "base": developmentURL,
                "route": developmentRoute,
                "routerMode": "history",
                "sentry": false,
                "debug": true
            },
            "urls": {
                "api": developmentURL + apiEndPoint
            },
            "properties": {
                "fb": "144062099411527",
                "ga": "ua2423423",
                "gp": "1015126163676-t0vmcvjts8t11vb85k0gs1u3e5lj2hfe.apps.googleusercontent.com",
                "xeerpa": "https://indio.com.mx/agegate/socialLogin/socialLoginCallback.php",
            }
        }
    }
};

//ENVIRONMENT
let env = "development";
const host = document.location.host;

switch (host.split(":").shift()) {
    case "localhost": {
        env = "development";
        break;
    }

    case "fooprojects.com": {
        env = "staging";
        break;
    }

    case "staging.marca.com": {
        env = "staging";
        break;
    }

    case "qa.marca.com": {
        env = "qa";
        break;
    }

    case "marca.com": {
        env = "production";
        break;
    }
    default: {
        env = "development";
        break;
    }
}

const environment = config["environments"][env];

const developers = [
    {
        "name": "Juan",
        "url": "http://github.com"
    },
    {
        "name": "Erick",
        "url": "http://github.com"
    },
    {
        "name": "José",
        "url": "http://github.com"
    }
];

const designers = [
    {
        name: "Alex",
        url: "http://behance.com"
    }
];

const producers = [
    {
        name: "Ajo"
    }
];

module.exports = {config, environment, developers, designers, producers};

