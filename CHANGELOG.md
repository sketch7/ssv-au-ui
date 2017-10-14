<a name="0.7.2"></a>
## [0.7.2](https://github.com/sketch7/ssv-au-ui/compare/0.7.0...0.7.2) (2017-10-14)


### Bug Fixes

* **webpack:** wrap `globalResources` in `PLATFORM.moduleName` ([676a7d1](https://github.com/sketch7/ssv-au-ui/commit/676a7d1))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/sketch7/ssv-au-ui/compare/0.7.0...0.7.1) (2017-10-11)


### Bug Fixes

* **waves:** now is type value merged with global config ([7385fa5](https://github.com/sketch7/ssv-au-ui/commit/7385fa5))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/sketch7/ssv-au-ui/compare/0.6.0...v0.7.0) (2017-04-09)


### Features

* **select:** implemented `ssv-select` component
* **highlight:** implemented `highlight` value convertor ([25b1d09](https://github.com/sketch7/ssv-au-ui/commit/25b1d09))
* **packages:** updated dependencies to latest ([934b891](https://github.com/sketch7/ssv-au-ui/commit/934b891))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/sketch7/ssv-au-ui/compare/0.5.4...0.6.0) (2017-03-20)


### Bug Fixes

* **badge:** badge was being trimmed ([e3627bb](https://github.com/sketch7/ssv-au-ui/commit/e3627bb))


### Features

* **snackbar:** implemented `ssv-snackbar` component ([f703a57](https://github.com/sketch7/ssv-au-ui/commit/f703a57))



<a name="0.5.4"></a>
## [0.5.4](https://github.com/sketch7/ssv-au-ui/compare/0.5.3...0.5.4) (2017-02-19)


### Bug Fixes

* **input:** fixed getter from re-evaluating the property (dirty checking) every 120ms. ([0b18157](https://github.com/sketch7/ssv-au-ui/commit/0b18157))



<a name="0.5.3"></a>
## [0.5.3](https://github.com/sketch7/ssv-au-ui/compare/0.5.2...0.5.3) (2017-02-12)


### Bug Fixes

* **input:** fixed small unintended visual with variant border had always shadows, not only when focused ([0401f2a](https://github.com/sketch7/ssv-au-ui/commit/0401f2a))


### Code Refactoring

* **input:** changed input sass variants to use sass maps + added primary, accent colors ([cf31d4b](https://github.com/sketch7/ssv-au-ui/commit/cf31d4b))


### Features

* **input:** added color as a new field to be consistent with other components ([fafc3bf](https://github.com/sketch7/ssv-au-ui/commit/fafc3bf))
* **input:** added global config for input ([92f4935](https://github.com/sketch7/ssv-au-ui/commit/92f4935))
* **input:** variant focused-color is now configurable and takes initial value from color ([e6bb65a](https://github.com/sketch7/ssv-au-ui/commit/e6bb65a))


### BREAKING CHANGES

* **input:** input modifier `ssv-input--error` has been changed to `ssv-input--danger` for consistency



<a name="0.5.2"></a>
## [0.5.2](https://github.com/sketch7/ssv-au-ui/compare/0.5.1...0.5.2) (2017-02-12)


### Features

* **packages:** changed dependencies from `peerDependencies` to `dependencies` ([9cce7be](https://github.com/sketch7/ssv-au-ui/commit/9cce7be))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/sketch7/ssv-au-ui/compare/0.5.0...0.5.1) (2017-02-12)


### Bug Fixes

* **button:** fixed outline style to be displayed correctly for variants ([cc027ad](https://github.com/sketch7/ssv-au-ui/commit/cc027ad))


### Features

* **checkbox:** added checkbox global config ([4f0efc0](https://github.com/sketch7/ssv-au-ui/commit/4f0efc0))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/sketch7/ssv-au-ui/compare/0.4.0...0.5.0) (2017-02-12)


### Features

* **checkbox:** implemented `ssv-checkbox` component ([ba48fea](https://github.com/sketch7/ssv-au-ui/commit/ba48fea))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/sketch7/ssv-au-ui/compare/0.3.1...0.4.0) (2017-02-05)


### Features

* **icon:** implemented `ssv-icon` component ([8dc50a5](https://github.com/sketch7/ssv-au-ui/commit/8dc50a5))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/sketch7/ssv-au-ui/compare/0.3.0...0.3.1) (2017-02-02)

### Bug Fixes

* **global readme:** fixed npm version badge fury icon

<a name="0.3.0"></a>
# [0.3.0](https://github.com/sketch7/ssv-au-ui/compare/0.2.0...0.3.0) (2017-02-01)


### Features

* **badge:** implemented `ssv-badge` component ([31f63bd](https://github.com/sketch7/ssv-au-ui/commit/31f63bd))


<a name="0.2.0"></a>
# [0.2.0](https://github.com/sketch7/ssv-au-ui/compare/0.1.0...0.2.0) (2017-01-30)

### Bug Fixes

<a name="0.1.0"></a>
# [0.1.0](https://github.com/sketch7/ssv-au-ui/compare/c1887ba...0.1.0) (2017-01-30)


### Bug Fixes

* **package:** updated au-core version and peerDependencies accordingly. ([9c241f1](https://github.com/sketch7/ssv-au-ui/commit/9c241f1))


### Features

* **global.config:** added global configuration ([eb8555e](https://github.com/sketch7/ssv-au-ui/commit/eb8555e))
* **package:** updated `[@ssv](https://github.com/ssv)/au-core` to `^0.3.0` ([68eb21e](https://github.com/sketch7/ssv-au-ui/commit/68eb21e))
* **scss:** split vendors, core and components and all so they can be imported separately if desired ([fedffaa](https://github.com/sketch7/ssv-au-ui/commit/fedffaa))
* **input:** implemented `ssv-input` component
* **waves:** implemented `ssv-waves` attribute ([a497cb2](https://github.com/sketch7/ssv-au-ui/commit/a497cb2))
