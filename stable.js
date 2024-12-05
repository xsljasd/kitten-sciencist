// ==UserScript==
// @name        Kitten Scientists
// @description Add-on for the wonderful incremental browser game: https://kittensgame.com/web/
// @namespace   https://kitten-science.com/
// @icon        https://kitten-science.com/assets/images/organization-logo64.png
// @author      Oliver Salzburg <oliver.salzburg@gmail.com>
// @match       https://kittensgame.com/web/
// @match       https://kittensgame.com/beta/
// @match       https://kittensgame.com/alpha/
// @version     2.0.0-beta.8
// @homepage    https://github.com/kitten-science/kitten-scientists
// @supportURL  https://github.com/kitten-science/kitten-scientists/issues
// @updateURL   https://kitten-science.com/stable.js
// @grant       none
// ==/UserScript==
(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

  var _options, _upgrade, _baseBuilding, _building, _stage, _building2, _variant, _policy, _tech, _variant2, _upgrade2, _resource, _resource2, _mission, _building3, _building4, _building5, _variant3, _resource3, _building6, _building7, _variant4, _upgrade3, _building8, _variant5, _race, _race2, _require, _parent, _children, _store, _getStoreEntry, getStoreEntry_fn, _request, _response, _dataParsed, _data, _resolveBases, resolveBases_fn;
  function cdebug(...args) {
    console.debug("👩‍🔬", ...args);
  }
  function cinfo(...args) {
    console.info("👩‍🔬", ...args);
  }
  function cwarn(...args) {
    console.warn("👩‍🔬", ...args);
  }
  function cerror(...args) {
    console.error("👩‍🔬", ...args);
  }
  const sleep = (duration) => {
    return new Promise((resolve2) => setTimeout(resolve2, duration));
  };
  const retry = async (executable, retryDelay = 0, retryCount = 0) => {
    try {
      return await executable();
    } catch (error2) {
      if (0 < retryCount) {
        if (0 < retryDelay) {
          await sleep(retryDelay);
        }
        return retry(executable, retryDelay, --retryCount);
      }
      throw error2;
    }
  };
  function isNil(subject) {
    return subject === null || subject === void 0;
  }
  function is(subject, Prototype) {
    return !isNil(subject) && subject instanceof Prototype;
  }
  class UnexpectedNilError extends Error {
    /**
     * Constructs a new {@linkcode UnexpectedNilError}.
     * @param message - The error message.
     */
    constructor(message = "unexpected nil value") {
      super(message);
    }
  }
  function mustExist(subject, errorMessage) {
    if (isNil(subject)) {
      throw new UnexpectedNilError(errorMessage);
    }
    return subject;
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  const debug$1 = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
  };
  var debug_1 = debug$1;
  const SEMVER_SPEC_VERSION = "2.0.0";
  const MAX_LENGTH$1 = 256;
  const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991;
  const MAX_SAFE_COMPONENT_LENGTH = 16;
  const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH$1 - 6;
  const RELEASE_TYPES = [
    "major",
    "premajor",
    "minor",
    "preminor",
    "patch",
    "prepatch",
    "prerelease"
  ];
  var constants = {
    MAX_LENGTH: MAX_LENGTH$1,
    MAX_SAFE_COMPONENT_LENGTH,
    MAX_SAFE_BUILD_LENGTH,
    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
    RELEASE_TYPES,
    SEMVER_SPEC_VERSION,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  };
  var re$1 = { exports: {} };
  (function(module, exports) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2,
      MAX_SAFE_BUILD_LENGTH: MAX_SAFE_BUILD_LENGTH2,
      MAX_LENGTH: MAX_LENGTH2
    } = constants;
    const debug2 = debug_1;
    exports = module.exports = {};
    const re2 = exports.re = [];
    const safeRe = exports.safeRe = [];
    const src = exports.src = [];
    const t2 = exports.t = {};
    let R = 0;
    const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    const safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH2],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH2]
    ];
    const makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    const createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug2(name, index, value);
      t2[name] = index;
      src[index] = value;
      re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
    createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
    createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t2.COERCE], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(re$1, re$1.exports);
  var reExports = re$1.exports;
  const looseOption = Object.freeze({ loose: true });
  const emptyOpts = Object.freeze({});
  const parseOptions$1 = (options) => {
    if (!options) {
      return emptyOpts;
    }
    if (typeof options !== "object") {
      return looseOption;
    }
    return options;
  };
  var parseOptions_1 = parseOptions$1;
  const numeric = /^[0-9]+$/;
  const compareIdentifiers$1 = (a, b) => {
    const anum = numeric.test(a);
    const bnum = numeric.test(b);
    if (anum && bnum) {
      a = +a;
      b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  };
  const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);
  var identifiers = {
    compareIdentifiers: compareIdentifiers$1,
    rcompareIdentifiers
  };
  const debug = debug_1;
  const { MAX_LENGTH, MAX_SAFE_INTEGER } = constants;
  const { safeRe: re, t } = reExports;
  const parseOptions = parseOptions_1;
  const { compareIdentifiers } = identifiers;
  let SemVer$1 = class SemVer2 {
    constructor(version, options) {
      options = parseOptions(options);
      if (version instanceof SemVer2) {
        if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError(
          `version is longer than ${MAX_LENGTH} characters`
        );
      }
      debug("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
      if (!m) {
        throw new TypeError(`Invalid Version: ${version}`);
      }
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map((id2) => {
          if (/^[0-9]+$/.test(id2)) {
            const num = +id2;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id2;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    format() {
      this.version = `${this.major}.${this.minor}.${this.patch}`;
      if (this.prerelease.length) {
        this.version += `-${this.prerelease.join(".")}`;
      }
      return this.version;
    }
    toString() {
      return this.version;
    }
    compare(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer2)) {
        if (typeof other === "string" && other === this.version) {
          return 0;
        }
        other = new SemVer2(other, this.options);
      }
      if (other.version === this.version) {
        return 0;
      }
      return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
      if (!(other instanceof SemVer2)) {
        other = new SemVer2(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
      if (!(other instanceof SemVer2)) {
        other = new SemVer2(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      let i = 0;
      do {
        const a = this.prerelease[i];
        const b = other.prerelease[i];
        debug("prerelease compare", i, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }
    compareBuild(other) {
      if (!(other instanceof SemVer2)) {
        other = new SemVer2(other, this.options);
      }
      let i = 0;
      do {
        const a = this.build[i];
        const b = other.build[i];
        debug("prerelease compare", i, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier, identifierBase) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier, identifierBase);
          this.inc("pre", identifier, identifierBase);
          break;
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier, identifierBase);
          }
          this.inc("pre", identifier, identifierBase);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        case "pre": {
          const base = Number(identifierBase) ? 1 : 0;
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (this.prerelease.length === 0) {
            this.prerelease = [base];
          } else {
            let i = this.prerelease.length;
            while (--i >= 0) {
              if (typeof this.prerelease[i] === "number") {
                this.prerelease[i]++;
                i = -2;
              }
            }
            if (i === -1) {
              if (identifier === this.prerelease.join(".") && identifierBase === false) {
                throw new Error("invalid increment argument: identifier already exists");
              }
              this.prerelease.push(base);
            }
          }
          if (identifier) {
            let prerelease = [identifier, base];
            if (identifierBase === false) {
              prerelease = [identifier];
            }
            if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = prerelease;
              }
            } else {
              this.prerelease = prerelease;
            }
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${release}`);
      }
      this.raw = this.format();
      if (this.build.length) {
        this.raw += `+${this.build.join(".")}`;
      }
      return this;
    }
  };
  var semver = SemVer$1;
  const SemVer = semver;
  const compare$1 = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
  var compare_1 = compare$1;
  const compare = compare_1;
  const gt = (a, b, loose) => compare(a, b, loose) > 0;
  var gt_1 = gt;
  const gt$1 = /* @__PURE__ */ getDefaultExportFromCjs(gt_1);
  class TabManager {
    constructor(host, name) {
      __publicField(this, "_host");
      __publicField(this, "tab");
      this._host = host;
      const tab = this._host.game.tabs.find((subject) => subject.tabId === name);
      if (isNil(tab)) {
        throw new Error(`Unable to find tab ${name}`);
      }
      this.tab = tab;
      this.render();
    }
    render() {
      if (this._host.game.ui.activeTabId !== this.tab.tabId) {
        this.tab.render();
      }
      return this;
    }
  }
  const deepMergeLeft = (a, b) => {
    const subject = { ...a };
    for (const [key, value] of Object.entries(b)) {
      if (typeof value === "object") {
        subject[key] = deepMergeLeft(
          key in a ? a[key] : {},
          b[key]
        );
        continue;
      }
      subject[key] = b[key] ?? a[key];
    }
    return subject;
  };
  function objectEntries(subject) {
    return Object.entries(subject);
  }
  function consumeEntriesPedantic(subject, source, consumer) {
    if (isNil(source)) {
      cwarn("No source data was provided.");
      return subject;
    }
    for (const [key, value] of objectEntries(subject)) {
      if (key in source === false) {
        cinfo(`Entry '${key}' is missing in source. Using default value.`);
      }
      consumer(value, source[key]);
    }
    for (const [key] of objectEntries(source)) {
      if (key in subject === false) {
        cwarn(
          `Entry '${key}' was found in source, but it is not expected by the subject schema. This entry will be ignored.`
        );
      }
    }
    return subject;
  }
  class BulkPurchaseHelper {
    constructor(host, workshopManager) {
      __publicField(this, "_host");
      __publicField(this, "_workshopManager");
      this._host = host;
      this._workshopManager = workshopManager;
    }
    /**
     * Take a hash of potential builds and determine how many of them can be built.
     *
     * @param builds All potential builds.
     * @param metaData The metadata for the potential builds.
     * @param trigger The configured trigger threshold for these builds.
     * @param sourceTab The tab these builds originate from.
     * @returns All the possible builds.
     */
    bulk(builds, metaData, trigger, sourceTab) {
      const buildsPerformed = [];
      const potentialBuilds = [];
      let counter = 0;
      for (const [name, build] of objectEntries(builds)) {
        const buildMetaData = mustExist(metaData[name]);
        if (!build.enabled) {
          continue;
        }
        if ("tHidden" in buildMetaData && buildMetaData.tHidden === true) {
          continue;
        }
        if ("rHidden" in buildMetaData && buildMetaData.rHidden === true) {
          continue;
        }
        if (buildMetaData.unlocked === false) {
          continue;
        }
        if (!isNil(build.max) && -1 < build.max && build.max <= buildMetaData.val) {
          continue;
        }
        if (name === "cryochambers" && (mustExist(this._host.game.time.getVSU("usedCryochambers")).val > 0 || this._host.game.bld.getBuildingExt("chronosphere").meta.val <= buildMetaData.val)) {
          continue;
        }
        if (name === "ressourceRetrieval" && buildMetaData.val >= 100) {
          continue;
        }
        const prices = mustExist(
          this._isStagedBuild(buildMetaData) ? buildMetaData.stages[buildMetaData.stage].prices : buildMetaData.prices
        );
        const priceRatio = this.getPriceRatio(buildMetaData, sourceTab);
        if (!this.singleBuildPossible(buildMetaData, prices, priceRatio, sourceTab)) {
          continue;
        }
        const requiredMaterials = prices.map((price) => this._workshopManager.getResource(price.name)).filter((material) => 0 < material.maxValue);
        const allMaterialsAboveTrigger = requiredMaterials.filter((material) => material.value / material.maxValue < trigger).length === 0;
        if (allMaterialsAboveTrigger) {
          if (this._isStagedBuild(buildMetaData) && typeof build.stage !== "undefined" && build.stage !== buildMetaData.stage) {
            continue;
          }
          const itemPrices = [];
          const pricesDiscount = this._host.game.getLimitedDR(
            // @ts-expect-error getEffect will return 0 for invalid effects. So this is safe either way.
            this._host.game.getEffect(`${name}CostReduction`),
            1
          );
          const priceModifier = 1 - pricesDiscount;
          for (const price of prices) {
            const resPriceDiscount = this._host.game.getLimitedDR(
              this._host.game.getEffect(`${price.name}CostReduction`),
              1
            );
            const resPriceModifier = 1 - resPriceDiscount;
            itemPrices.push({
              val: price.val * priceModifier * resPriceModifier,
              name: price.name
            });
          }
          buildsPerformed.push({
            count: 0,
            id: name,
            label: build.label,
            name: build.baseBuilding ?? build.building,
            stage: build.stage,
            variant: build.variant
          });
          potentialBuilds.push({
            id: name,
            name: build.baseBuilding ?? build.building,
            count: 0,
            spot: counter,
            prices: itemPrices,
            priceRatio,
            source: sourceTab,
            limit: build.max || 0,
            val: buildMetaData.val
          });
          counter++;
        }
      }
      if (potentialBuilds.length === 0) {
        return [];
      }
      const tempPool = {};
      for (const res of this._host.game.resPool.resources) {
        tempPool[res.name] = this._workshopManager.getValueAvailable(res.name);
      }
      for (const potentialBuild of potentialBuilds) {
        const buildCount = this._getPossibleBuildCount(potentialBuild, metaData, tempPool);
        potentialBuild.count = buildCount;
        const performedBuild = mustExist(
          buildsPerformed.find((build) => build.id === potentialBuild.id)
        );
        performedBuild.count = potentialBuild.count;
      }
      return buildsPerformed;
    }
    /**
     * Calculate how many of a given build item build be built with the given resources.
     *
     * @param buildCacheItem The item to build.
     * @param buildCacheItem.id ?
     * @param buildCacheItem.name ?
     * @param buildCacheItem.count ?
     * @param buildCacheItem.spot ?
     * @param buildCacheItem.prices ?
     * @param buildCacheItem.priceRatio ?
     * @param buildCacheItem.source ?
     * @param buildCacheItem.limit ?
     * @param buildCacheItem.val ?
     * @param metaData The metadata for the potential builds.
     * @param resources The currently available resources.
     * @returns The number of items that could be built. If this is non-zero, the `resources` will have been adjusted
     * to reflect the number of builds made.
     */
    _getPossibleBuildCount(buildCacheItem, metaData, resources = {}) {
      let unknown_k = 0;
      const tempPool = Object.assign({}, resources);
      const buildMetaData = mustExist(metaData[buildCacheItem.id]);
      const prices = buildCacheItem.prices;
      const priceRatio = buildCacheItem.priceRatio;
      const source = buildCacheItem.source;
      let maxItemsBuilt = false;
      while (!maxItemsBuilt) {
        for (let priceIndex = 0; priceIndex < prices.length; priceIndex++) {
          let spaceOil = false;
          let cryoKarma = false;
          let oilPrice = Infinity;
          let karmaPrice = Infinity;
          if (source && source === "space" && prices[priceIndex].name === "oil") {
            spaceOil = true;
            const oilReductionRatio = this._host.game.getEffect("oilReductionRatio");
            oilPrice = prices[priceIndex].val * (1 - this._host.game.getLimitedDR(oilReductionRatio, 0.75));
          } else if (buildCacheItem.id === "cryochambers" && prices[priceIndex].name === "karma") {
            cryoKarma = true;
            const burnedParagonRatio = this._host.game.prestige.getBurnedParagonRatio();
            karmaPrice = prices[priceIndex].val * (1 - this._host.game.getLimitedDR(0.01 * burnedParagonRatio, 1));
          }
          if (spaceOil) {
            maxItemsBuilt = tempPool["oil"] < oilPrice * Math.pow(1.05, unknown_k + buildMetaData.val);
          } else if (cryoKarma) {
            maxItemsBuilt = tempPool["karma"] < karmaPrice * Math.pow(priceRatio, unknown_k + buildMetaData.val);
          } else {
            maxItemsBuilt = tempPool[prices[priceIndex].name] < prices[priceIndex].val * Math.pow(priceRatio, unknown_k + buildMetaData.val);
          }
          if (maxItemsBuilt || // Is this a non-stackable build?
          // Space missions and religion upgrades (before transcendence is unlocked)
          // are example of non-stackable builds.
          "noStackable" in buildMetaData && buildMetaData.noStackable && unknown_k + buildMetaData.val >= 1 || // Is this the resource retrieval build? This one is limited to 100 units.
          buildCacheItem.id === "ressourceRetrieval" && unknown_k + buildMetaData.val >= 100 || buildCacheItem.id === "cryochambers" && this._host.game.bld.getBuildingExt("chronosphere").meta.val <= unknown_k + buildMetaData.val) {
            for (let priceIndex2 = 0; priceIndex2 < priceIndex; priceIndex2++) {
              if (source && source === "space" && prices[priceIndex2].name === "oil") {
                const oilReductionRatio = this._host.game.getEffect("oilReductionRatio");
                const oilPriceRefund = prices[priceIndex2].val * (1 - this._host.game.getLimitedDR(oilReductionRatio, 0.75));
                tempPool["oil"] += oilPriceRefund * Math.pow(1.05, unknown_k + buildMetaData.val);
              } else if (buildCacheItem.id === "cryochambers" && prices[priceIndex2].name === "karma") {
                const burnedParagonRatio = this._host.game.prestige.getBurnedParagonRatio();
                const karmaPriceRefund = prices[priceIndex2].val * (1 - this._host.game.getLimitedDR(0.01 * burnedParagonRatio, 1));
                tempPool["karma"] += karmaPriceRefund * Math.pow(priceRatio, unknown_k + buildMetaData.val);
              } else {
                const refundVal = prices[priceIndex2].val * Math.pow(priceRatio, unknown_k + buildMetaData.val);
                tempPool[prices[priceIndex2].name] += prices[priceIndex2].name === "void" ? Math.ceil(refundVal) : refundVal;
              }
            }
            if (buildCacheItem.limit && buildCacheItem.limit !== -1) {
              buildCacheItem.count = Math.max(
                0,
                Math.min(buildCacheItem.count, buildCacheItem.limit - buildCacheItem.val)
              );
            }
            Object.assign(resources, tempPool);
            return buildCacheItem.count;
          }
          if (spaceOil) {
            tempPool["oil"] -= oilPrice * Math.pow(1.05, unknown_k + buildMetaData.val);
          } else if (cryoKarma) {
            tempPool["karma"] -= karmaPrice * Math.pow(priceRatio, unknown_k + buildMetaData.val);
          } else {
            const newPriceValue = prices[priceIndex].val * Math.pow(priceRatio, unknown_k + buildMetaData.val);
            tempPool[prices[priceIndex].name] -= prices[priceIndex].name === "void" ? Math.ceil(newPriceValue) : newPriceValue;
          }
        }
        ++unknown_k;
        ++buildCacheItem.count;
      }
      Object.assign(resources, tempPool);
      return buildCacheItem.count;
    }
    /**
     * Try to trigger the build for a given button.
     *
     * @param model The model associated with the button.
     * @param button The build button.
     * @param amount How many items to build.
     * @returns How many items were built.
     * @see `build`@`core.js`
     * @deprecated This should just call `build()` on the game page. I don't understand why it shouldn't.
     */
    construct(model, button, amount) {
      const meta = model.metadata;
      let counter = 0;
      const vsMeta = meta;
      if (!isNil(vsMeta.limitBuild) && vsMeta.limitBuild - vsMeta.val < amount) {
        amount = vsMeta.limitBuild - vsMeta.val;
      }
      if (model.enabled && button.controller.hasResources(model) || this._host.game.devMode) {
        while (button.controller.hasResources(model) && amount > 0) {
          model.prices = button.controller.getPrices(model);
          button.controller.payPrice(model);
          button.controller.incrementValue(model);
          counter++;
          amount--;
        }
        if (vsMeta.breakIronWill) {
          this._host.game.ironWill = false;
        }
        if (meta.unlocks) {
          this._host.game.unlock(meta.unlocks);
        }
        if (meta.upgrades) {
          this._host.game.upgrade(meta.upgrades);
        }
      }
      return counter;
    }
    _isStagedBuild(data) {
      return "stage" in data && "stages" in data && !isNil(data.stage) && !isNil(data.stages);
    }
    /**
     * Determine the price modifier for the given building.
     *
     * @param data The building metadata.
     * @param source The tab the building belongs to.
     * @returns The price modifier for this building.
     * @see `getPriceRatioWithAccessor`@`buildings.js`
     */
    getPriceRatio(data, source) {
      const ratio = (
        // TODO: This seems weird. Why not take the price ratio of the stage as the default?
        this._isStagedBuild(data) ? data.priceRatio || data.stages[data.stage].priceRatio : data.priceRatio ?? 0
      );
      let ratioDiff = 0;
      if (source && source === "bonfire") {
        ratioDiff = this._host.game.getEffect(`${data.name}PriceRatio`) + this._host.game.getEffect("priceRatio") + this._host.game.getEffect("mapPriceReduction");
        ratioDiff = this._host.game.getLimitedDR(ratioDiff, ratio - 1);
      }
      return ratio + ratioDiff;
    }
    /**
     * Check if a given build could be performed.
     *
     * @param build The build that should be checked.
     * @param build.name The name of the build.
     * @param build.val Probably how many items should be built in total.
     * TODO: Why is this relevant if we only care about a single build being possible?
     * @param prices The current prices for the build.
     * @param priceRatio The global price ratio modifier.
     * @param source What tab did the build originate from?
     * @returns `true` if the build is possible; `false` otherwise.
     */
    singleBuildPossible(build, prices, priceRatio, source) {
      const pricesDiscount = this._host.game.getLimitedDR(
        this._host.game.getEffect(`${build.name}CostReduction`),
        1
      );
      const priceModifier = 1 - pricesDiscount;
      for (const price of prices) {
        const resourcePriceDiscount = this._host.game.getLimitedDR(
          this._host.game.getEffect(`${price.name}CostReduction`),
          1
        );
        const resourcePriceModifier = 1 - resourcePriceDiscount;
        const finalResourcePrice = price.val * priceModifier * resourcePriceModifier;
        if (source && source === "space" && price.name === "oil") {
          const oilModifier = this._host.game.getLimitedDR(
            this._host.game.getEffect("oilReductionRatio"),
            0.75
          );
          const oilPrice = finalResourcePrice * (1 - oilModifier);
          if (this._workshopManager.getValueAvailable("oil") < oilPrice * Math.pow(1.05, build.val)) {
            return false;
          }
        } else if (build.name === "cryochambers" && price.name === "karma") {
          const karmaModifier = this._host.game.getLimitedDR(
            0.01 * this._host.game.prestige.getBurnedParagonRatio(),
            1
          );
          const karmaPrice = finalResourcePrice * (1 - karmaModifier);
          if (this._workshopManager.getValueAvailable("karma") < karmaPrice * Math.pow(priceRatio, build.val)) {
            return false;
          }
        } else {
          if (this._workshopManager.getValueAvailable(price.name) < finalResourcePrice * Math.pow(priceRatio, build.val)) {
            return false;
          }
        }
      }
      return true;
    }
  }
  class Setting {
    constructor(enabled = false) {
      __publicField(this, "enabled");
      this.enabled = enabled;
    }
    load(setting) {
      if (isNil(setting)) {
        return;
      }
      this.enabled = setting.enabled ?? this.enabled;
    }
    serialize() {
      return this;
    }
  }
  class SettingLimited extends Setting {
    constructor(enabled = false, limited = false) {
      super(enabled);
      __publicField(this, "limited");
      this.limited = limited;
    }
    load(setting) {
      if (isNil(setting)) {
        return;
      }
      super.load(setting);
      this.limited = setting.limited ?? this.limited;
    }
  }
  class SettingTrigger extends Setting {
    constructor(enabled = false, trigger = 1) {
      super(enabled);
      __publicField(this, "trigger");
      this.trigger = trigger;
    }
    load(setting) {
      if (isNil(setting)) {
        return;
      }
      super.load(setting);
      this.trigger = setting.trigger ?? this.trigger;
    }
  }
  class SettingMax extends Setting {
    constructor(enabled = false, max = -1) {
      super(enabled);
      __publicField(this, "max");
      this.max = max;
    }
    load(setting) {
      if (isNil(setting)) {
        return;
      }
      super.load(setting);
      this.max = setting.max ?? this.max;
    }
  }
  class SettingLimitedMax extends SettingLimited {
    constructor(enabled = false, limited = false, max = -1) {
      super(enabled, limited);
      __publicField(this, "max");
      this.max = max;
    }
    load(setting) {
      if (isNil(setting)) {
        return;
      }
      super.load(setting);
      this.max = setting.max ?? this.max;
    }
  }
  class SettingTriggerMax extends SettingTrigger {
    constructor(enabled = false, trigger = 1, max = -1) {
      super(enabled, trigger);
      __publicField(this, "max");
      this.max = max;
    }
    load(setting) {
      if (isNil(setting)) {
        return;
      }
      super.load(setting);
      this.max = setting.max ?? this.max;
    }
  }
  class SettingOptions {
    constructor(selected, options = new Array()) {
      __privateAdd(this, _options, void 0);
      __publicField(this, "selected");
      if (isNil(options.find((option) => option.value === selected))) {
        throw new Error("Provided selected value is not in provided options.");
      }
      this.selected = selected;
      __privateSet(this, _options, options);
    }
    get options() {
      return __privateGet(this, _options);
    }
    load(setting) {
      if (isNil(setting)) {
        return;
      }
      this.selected = setting.selected ?? this.selected;
    }
  }
  _options = new WeakMap();
  class SettingBuySellTrigger extends SettingTrigger {
    constructor(enabled = false, buy = 0, sell = 1e3, trigger = 1) {
      super(enabled, trigger);
      __publicField(this, "buy");
      __publicField(this, "sell");
      this.buy = buy;
      this.sell = sell;
    }
    load(setting) {
      if (isNil(setting)) {
        return;
      }
      super.load(setting);
      this.buy = setting.buy ?? this.buy;
      this.sell = setting.sell ?? this.sell;
    }
  }
  class BuildingUpgradeSetting extends Setting {
    constructor(upgrade, enabled = false) {
      super(enabled);
      __privateAdd(this, _upgrade, void 0);
      __privateSet(this, _upgrade, upgrade);
    }
    get upgrade() {
      return __privateGet(this, _upgrade);
    }
  }
  _upgrade = new WeakMap();
  class BuildingUpgradeSettings extends Setting {
    constructor(enabled = false, buildings = {
      broadcasttower: new BuildingUpgradeSetting("broadcasttower", true),
      dataCenter: new BuildingUpgradeSetting("dataCenter", true),
      hydroplant: new BuildingUpgradeSetting("hydroplant", true),
      solarfarm: new BuildingUpgradeSetting("solarfarm", true),
      spaceport: new BuildingUpgradeSetting("spaceport", true)
    }) {
      super(enabled);
      __publicField(this, "buildings");
      this.buildings = buildings;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
      });
    }
  }
  class BonfireBuildingSetting extends SettingMax {
    constructor(building, enabled = false, max = -1, baseStage) {
      super(enabled, max);
      /**
       * In case this is an upgrade of another building, this is the name of the
       * base building.
       */
      __privateAdd(this, _baseBuilding, void 0);
      __privateAdd(this, _building, void 0);
      /**
       * In case this is an upgradable building, this indicates the level of
       * the stage.
       */
      __privateAdd(this, _stage, 0);
      __privateSet(this, _building, building);
      if (baseStage) {
        __privateSet(this, _stage, 1);
        __privateSet(this, _baseBuilding, baseStage);
      }
    }
    get baseBuilding() {
      return __privateGet(this, _baseBuilding);
    }
    get building() {
      return __privateGet(this, _building);
    }
    get stage() {
      return __privateGet(this, _stage);
    }
  }
  _baseBuilding = new WeakMap();
  _building = new WeakMap();
  _stage = new WeakMap();
  class BonfireSettings extends SettingTrigger {
    constructor(enabled = false, trigger = 0, buildings = {
      academy: new BonfireBuildingSetting("academy", true),
      accelerator: new BonfireBuildingSetting("accelerator", false),
      aiCore: new BonfireBuildingSetting("aiCore"),
      amphitheatre: new BonfireBuildingSetting("amphitheatre", true),
      aqueduct: new BonfireBuildingSetting("aqueduct", true),
      barn: new BonfireBuildingSetting("barn", true),
      biolab: new BonfireBuildingSetting("biolab", false),
      brewery: new BonfireBuildingSetting("brewery"),
      broadcasttower: new BonfireBuildingSetting("broadcasttower", true, -1, "amphitheatre"),
      calciner: new BonfireBuildingSetting("calciner", false),
      chapel: new BonfireBuildingSetting("chapel", true),
      chronosphere: new BonfireBuildingSetting("chronosphere", true),
      dataCenter: new BonfireBuildingSetting("dataCenter", true, -1, "library"),
      factory: new BonfireBuildingSetting("factory", true),
      field: new BonfireBuildingSetting("field", true),
      harbor: new BonfireBuildingSetting("harbor"),
      hut: new BonfireBuildingSetting("hut", false),
      hydroplant: new BonfireBuildingSetting("hydroplant", true, -1, "aqueduct"),
      library: new BonfireBuildingSetting("library", true),
      logHouse: new BonfireBuildingSetting("logHouse", false),
      lumberMill: new BonfireBuildingSetting("lumberMill", true),
      magneto: new BonfireBuildingSetting("magneto"),
      mansion: new BonfireBuildingSetting("mansion", false),
      mine: new BonfireBuildingSetting("mine", true),
      mint: new BonfireBuildingSetting("mint"),
      observatory: new BonfireBuildingSetting("observatory", true),
      oilWell: new BonfireBuildingSetting("oilWell", true),
      pasture: new BonfireBuildingSetting("pasture", true),
      quarry: new BonfireBuildingSetting("quarry", true),
      reactor: new BonfireBuildingSetting("reactor", false),
      smelter: new BonfireBuildingSetting("smelter", true),
      solarfarm: new BonfireBuildingSetting("solarfarm", true, -1, "pasture"),
      spaceport: new BonfireBuildingSetting("spaceport", true, -1, "warehouse"),
      steamworks: new BonfireBuildingSetting("steamworks"),
      temple: new BonfireBuildingSetting("temple", true),
      tradepost: new BonfireBuildingSetting("tradepost", true),
      warehouse: new BonfireBuildingSetting("warehouse"),
      workshop: new BonfireBuildingSetting("workshop", true),
      zebraForge: new BonfireBuildingSetting("zebraForge", false),
      zebraOutpost: new BonfireBuildingSetting("zebraOutpost", true),
      zebraWorkshop: new BonfireBuildingSetting("zebraWorkshop", false),
      ziggurat: new BonfireBuildingSetting("ziggurat", true)
    }, gatherCatnip = new Setting(true), turnOnSteamworks = new Setting(true), turnOnMagnetos = new Setting(false), upgradeBuildings = new BuildingUpgradeSettings()) {
      super(enabled, trigger);
      __publicField(this, "buildings");
      __publicField(this, "gatherCatnip");
      __publicField(this, "turnOnSteamworks");
      __publicField(this, "turnOnMagnetos");
      __publicField(this, "upgradeBuildings");
      this.buildings = buildings;
      this.gatherCatnip = gatherCatnip;
      this.turnOnSteamworks = turnOnSteamworks;
      this.turnOnMagnetos = turnOnMagnetos;
      this.upgradeBuildings = upgradeBuildings;
    }
    load(settings) {
      var _a, _b, _c;
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.max = (item == null ? void 0 : item.max) ?? building.max;
      });
      this.gatherCatnip.enabled = ((_a = settings.gatherCatnip) == null ? void 0 : _a.enabled) ?? this.gatherCatnip.enabled;
      this.turnOnSteamworks.enabled = ((_b = settings.turnOnSteamworks) == null ? void 0 : _b.enabled) ?? this.turnOnSteamworks.enabled;
      this.turnOnMagnetos.enabled = ((_c = settings.turnOnMagnetos) == null ? void 0 : _c.enabled) ?? this.turnOnMagnetos.enabled;
      this.upgradeBuildings.load(settings.upgradeBuildings);
    }
  }
  class BonfireManager {
    constructor(host, workshopManager, settings = new BonfireSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_bulkManager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Bonfire");
      this._workshopManager = workshopManager;
      this._bulkManager = new BulkPurchaseHelper(this._host, this._workshopManager);
    }
    tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      this.autoBuild();
      this.autoMisc();
    }
    /**
     * Try to build as many of the passed buildings as possible.
     * Usually, this is called at each iteration of the automation engine to
     * handle the building of items on the Bonfire tab.
     *
     * @param builds The buildings to build.
     */
    autoBuild(builds = this.settings.buildings) {
      const bulkManager = this._bulkManager;
      const trigger = this.settings.trigger;
      this.manager.render();
      const metaData = {};
      for (const build of Object.values(builds)) {
        metaData[build.building] = this.getBuild(
          build.baseBuilding ?? build.building
        ).meta;
      }
      const buildList = bulkManager.bulk(builds, metaData, trigger, "bonfire");
      let refreshRequired = false;
      for (const build of buildList) {
        if (build.count > 0) {
          this.build(build.name || build.id, build.stage, build.count);
          refreshRequired = true;
        }
      }
      if (refreshRequired) {
        this._host.game.ui.render();
      }
    }
    autoUpgrade() {
      const pastures = this._host.game.bld.getBuildingExt("pasture").meta.stage === 0 ? this._host.game.bld.getBuildingExt("pasture").meta.val : 0;
      const aqueducts = this._host.game.bld.getBuildingExt("aqueduct").meta.stage === 0 ? this._host.game.bld.getBuildingExt("aqueduct").meta.val : 0;
      const pastureMeta = this._host.game.bld.getBuildingExt("pasture").meta;
      if (this.settings.upgradeBuildings.buildings.solarfarm.enabled && pastureMeta.unlocked && pastureMeta.stage === 0 && mustExist(pastureMeta.stages)[1].stageUnlocked) {
        if (this._workshopManager.getPotentialCatnip(true, 0, aqueducts) > 0) {
          const prices = mustExist(pastureMeta.stages)[1].prices;
          if (this._bulkManager.singleBuildPossible(pastureMeta, prices, 1)) {
            const button = mustExist(this.getBuildButton("pasture", 0));
            button.controller.sellInternal(button.model, 0);
            pastureMeta.on = 0;
            pastureMeta.val = 0;
            pastureMeta.stage = 1;
            this._host.engine.iactivity("upgrade.building.pasture", [], "ks-upgrade");
            this._host.game.ui.render();
            this.build("pasture", 1, 1);
            this._host.game.ui.render();
            return;
          }
        }
      }
      const aqueductMeta = this._host.game.bld.getBuildingExt("aqueduct").meta;
      if (this.settings.upgradeBuildings.buildings.hydroplant.enabled && aqueductMeta.unlocked && aqueductMeta.stage === 0 && mustExist(aqueductMeta.stages)[1].stageUnlocked) {
        if (this._workshopManager.getPotentialCatnip(true, pastures, 0) > 0) {
          const prices = mustExist(aqueductMeta.stages)[1].prices;
          if (this._bulkManager.singleBuildPossible(aqueductMeta, prices, 1)) {
            const button = mustExist(this.getBuildButton("aqueduct", 0));
            button.controller.sellInternal(button.model, 0);
            aqueductMeta.on = 0;
            aqueductMeta.val = 0;
            aqueductMeta.stage = 1;
            aqueductMeta.calculateEffects(aqueductMeta, this._host.game);
            this._host.engine.iactivity("upgrade.building.aqueduct", [], "ks-upgrade");
            this._host.game.ui.render();
            this.build("aqueduct", 1, 1);
            this._host.game.ui.render();
            return;
          }
        }
      }
      const libraryMeta = this._host.game.bld.getBuildingExt("library").meta;
      if (this.settings.upgradeBuildings.buildings.dataCenter.enabled && libraryMeta.unlocked && libraryMeta.stage === 0 && mustExist(libraryMeta.stages)[1].stageUnlocked) {
        let energyConsumptionRate = this._host.game.workshop.get("cryocomputing").researched ? 1 : 2;
        if (this._host.game.challenges.currentChallenge === "energy") {
          energyConsumptionRate *= 2;
        }
        let libToDat = 3;
        if (this._host.game.workshop.get("uplink").researched) {
          libToDat *= 1 + this._host.game.bld.get("biolab").val * this._host.game.getEffect("uplinkDCRatio");
        }
        if (this._host.game.workshop.get("machineLearning").researched) {
          libToDat *= 1 + this._host.game.bld.get("aiCore").on * this._host.game.getEffect("dataCenterAIRatio");
        }
        if (this._host.game.resPool.energyProd >= this._host.game.resPool.energyCons + energyConsumptionRate * libraryMeta.val / libToDat) {
          const prices = mustExist(libraryMeta.stages)[1].prices;
          if (this._bulkManager.singleBuildPossible(libraryMeta, prices, 1)) {
            const button = mustExist(this.getBuildButton("library", 0));
            button.controller.sellInternal(button.model, 0);
            libraryMeta.on = 0;
            libraryMeta.val = 0;
            libraryMeta.stage = 1;
            libraryMeta.calculateEffects(libraryMeta, this._host.game);
            this._host.engine.iactivity("upgrade.building.library", [], "ks-upgrade");
            this._host.game.ui.render();
            this.build("library", 1, 1);
            this._host.game.ui.render();
            return;
          }
        }
      }
      const warehouseMeta = this._host.game.bld.getBuildingExt("warehouse").meta;
      if (this.settings.upgradeBuildings.buildings.spaceport.enabled && warehouseMeta.unlocked && warehouseMeta.stage === 0 && mustExist(warehouseMeta.stages)[1].stageUnlocked) {
        const prices = mustExist(warehouseMeta.stages)[1].prices;
        if (this._bulkManager.singleBuildPossible(warehouseMeta, prices, 1)) {
          const button = mustExist(this.getBuildButton("warehouse", 0));
          button.controller.sellInternal(button.model, 0);
          warehouseMeta.on = 0;
          warehouseMeta.val = 0;
          warehouseMeta.stage = 1;
          this._host.engine.iactivity("upgrade.building.warehouse", [], "ks-upgrade");
          this._host.game.ui.render();
          this.build("warehouse", 1, 1);
          this._host.game.ui.render();
          return;
        }
      }
      const amphitheatreMeta = this._host.game.bld.getBuildingExt("amphitheatre").meta;
      if (this.settings.upgradeBuildings.buildings.broadcasttower.enabled && amphitheatreMeta.unlocked && amphitheatreMeta.stage === 0 && mustExist(amphitheatreMeta.stages)[1].stageUnlocked) {
        const prices = mustExist(amphitheatreMeta.stages)[1].prices;
        if (this._bulkManager.singleBuildPossible(amphitheatreMeta, prices, 1)) {
          const button = mustExist(this.getBuildButton("amphitheatre", 0));
          button.controller.sellInternal(button.model, 0);
          amphitheatreMeta.on = 0;
          amphitheatreMeta.val = 0;
          amphitheatreMeta.stage = 1;
          this._host.engine.iactivity("upgrade.building.amphitheatre", [], "ks-upgrade");
          this._host.game.ui.render();
          this.build("amphitheatre", 1, 1);
          this._host.game.ui.render();
          return;
        }
      }
    }
    autoMisc() {
      if (this.settings.turnOnSteamworks.enabled) {
        const steamworks = this._host.game.bld.getBuildingExt("steamworks");
        if (steamworks.meta.val && steamworks.meta.on === 0) {
          const button = mustExist(this.getBuildButton("steamworks"));
          button.controller.onAll(button.model);
        }
      }
      if (this.settings.turnOnMagnetos.enabled) {
        const magnetos = this._host.game.bld.getBuildingExt("magneto");
        if (magnetos.meta.val && magnetos.meta.on < magnetos.meta.val) {
          const button = mustExist(this.getBuildButton("magneto"));
          button.controller.onAll(button.model);
        }
      }
      if (this.settings.upgradeBuildings.enabled) {
        this.autoUpgrade();
      }
      if (this.settings.gatherCatnip.enabled) {
        this.autoGather();
      }
    }
    autoGather() {
      const controller = new classes.game.ui.GatherCatnipButtonController(this._host.game);
      for (let clicks = 0; clicks < Math.floor(this._host.engine.settings.interval / 20); ++clicks) {
        controller.buyItem(null, null, () => {
        });
      }
    }
    build(name, stage, amount) {
      const build = this.getBuild(name);
      const button = this.getBuildButton(name, stage);
      if (!button || !button.model.enabled) {
        return;
      }
      const amountTemp = amount;
      const label = this._getBuildLabel(build.meta, stage);
      amount = this._bulkManager.construct(button.model, button, amount);
      if (amount !== amountTemp) {
        cwarn(`${label} Amount ordered: ${amountTemp} Amount Constructed: ${amount}`);
      }
      this._host.engine.storeForSummary(label, amount, "build");
      if (amount === 1) {
        this._host.engine.iactivity("act.build", [label], "ks-build");
      } else {
        this._host.engine.iactivity("act.builds", [label, amount], "ks-build");
      }
    }
    _getBuildLabel(meta, stage) {
      return meta.stages && !isNil(stage) ? meta.stages[stage].label : mustExist(meta.label);
    }
    getBuild(name) {
      return this._host.game.bld.getBuildingExt(name);
    }
    getBuildButton(name, stage) {
      const buttons = this.manager.tab.children;
      const build = this.getBuild(name);
      const label = this._getBuildLabel(build.meta, stage);
      for (const button of buttons) {
        const haystack = button.model.name;
        if (haystack.indexOf(label) !== -1) {
          return button;
        }
      }
      return null;
    }
  }
  function ucfirst(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
  function roundToTwo(input) {
    return Math.round(input * 100) / 100;
  }
  class ActivitySummary {
    constructor(host) {
      __publicField(this, "_host");
      /**
       * The day at which the activity summary was last reset.
       */
      __publicField(this, "_lastday");
      /**
       * The year at which the activity summary was last reset.
       */
      __publicField(this, "_lastyear");
      /**
       * The individual sections/categories of the activity summary.
       */
      __publicField(this, "_sections", /* @__PURE__ */ new Map());
      this._host = host;
      this.resetActivity();
    }
    resetActivity() {
      this._sections = /* @__PURE__ */ new Map();
      this._lastday = this._host.game.calendar.day;
      this._lastyear = this._host.game.calendar.year;
    }
    storeActivity(name, amount = 1, section = "other") {
      if (!this._sections.has(section)) {
        this._sections.set(section, /* @__PURE__ */ new Map());
      }
      const summarySection = mustExist(this._sections.get(section));
      if (!summarySection.has(name)) {
        summarySection.set(name, 0);
      }
      summarySection.set(name, mustExist(summarySection.get(name)) + amount);
    }
    renderSummary() {
      const summary = new Array();
      if (this._sections.has("other")) {
        const section = mustExist(this._sections.get("other"));
        section.forEach(
          (amount, name) => summary.push(
            this._host.engine.i18n(`summary.${name}`, [
              this._host.game.getDisplayValueExt(amount)
            ])
          )
        );
      }
      if (this._sections.has("research")) {
        const section = mustExist(this._sections.get("research"));
        section.forEach((amount, name) => {
          summary.push(this._host.engine.i18n("summary.tech", [ucfirst(name)]));
        });
      }
      if (this._sections.has("upgrade")) {
        const section = mustExist(this._sections.get("upgrade"));
        section.forEach((amount, name) => {
          summary.push(this._host.engine.i18n("summary.upgrade", [ucfirst(name)]));
        });
      }
      if (this._sections.has("build")) {
        const section = mustExist(this._sections.get("build"));
        section.forEach((amount, name) => {
          summary.push(
            this._host.engine.i18n("summary.building", [
              this._host.game.getDisplayValueExt(amount),
              ucfirst(name)
            ])
          );
        });
      }
      if (this._sections.has("refine")) {
        const section = mustExist(this._sections.get("refine"));
        section.forEach((amount, name) => {
          summary.push(
            this._host.engine.i18n("summary.refine", [
              this._host.game.getDisplayValueExt(amount),
              ucfirst(name)
            ])
          );
        });
      }
      if (this._sections.has("faith")) {
        const section = mustExist(this._sections.get("faith"));
        section.forEach((amount, name) => {
          summary.push(
            this._host.engine.i18n("summary.sun", [
              this._host.game.getDisplayValueExt(amount),
              ucfirst(name)
            ])
          );
        });
      }
      if (this._sections.has("craft")) {
        const section = mustExist(this._sections.get("craft"));
        section.forEach((amount, name) => {
          summary.push(
            this._host.engine.i18n("summary.craft", [
              this._host.game.getDisplayValueExt(amount),
              ucfirst(name)
            ])
          );
        });
      }
      if (this._sections.has("trade")) {
        const section = mustExist(this._sections.get("trade"));
        section.forEach((amount, name) => {
          summary.push(
            this._host.engine.i18n("summary.trade", [
              this._host.game.getDisplayValueExt(amount),
              ucfirst(name)
            ])
          );
        });
      }
      if (this._lastday && this._lastyear) {
        let years = this._host.game.calendar.year - this._lastyear;
        let days = this._host.game.calendar.day - this._lastday;
        if (days < 0) {
          years -= 1;
          days += 400;
        }
        let duration = "";
        if (years > 0) {
          duration += `${years} `;
          duration += years === 1 ? this._host.engine.i18n("summary.year") : this._host.engine.i18n("summary.years");
        }
        if (days >= 0) {
          if (years > 0)
            duration += this._host.engine.i18n("summary.separator");
          duration += `${roundToTwo(days)} `;
          duration += days === 1 ? this._host.engine.i18n("summary.day") : this._host.engine.i18n("summary.days");
        }
        summary.push(this._host.engine.i18n("summary.head", [duration]));
      }
      return summary;
    }
  }
  const de = {
    "act.accelerate": "Zeit beschleunigen!",
    "act.adore": "Verehre die Galaxie! Kumulierte {0} Anbetung zu {1} Epiphanie",
    "act.build": "Kätzchen haben ein neues {0} gebaut",
    "act.builds": "Kätzchen haben ein neues {0} {1} mal gebaut",
    "act.craft": "Kätzchen haben {0} {1} hergestellt",
    "act.distribute": "Verteilte ein Kätzchen an {0}",
    "act.elect": "Kätzchen haben einen neuen Anführer gewählt.",
    "act.feed": "Kätzchen haben die Ältesten gefüttert. Die Ältesten sind zufrieden",
    "act.fix.cry": "Kätzchen haben {0} Cryochamber repariert",
    "act.hunt": "Kätzchen auf {0} Jagden entsendet",
    "act.observe": "Kätzchen Wissenschaftler haben einen Stern beobachtet",
    "act.praise": "Lobt die Sonne! {0} Glauben zu {1} Verehrung kumuliert",
    "act.promote": "Der Anführer der Kätzchen wurde zum Rang {0} befördert",
    "act.refineTCs": "{0} Zeitkristalle verfeinert",
    "act.refineTears": "Tränen in BLS verfeinert",
    "act.sacrificeAlicorns": "{0} Alicorns geopfert",
    "act.sacrificeUnicorns": "Sacrificed {0} unicorns",
    "act.sun.discover": "Kätzchen haben {0} entdeckt",
    "act.sun.discovers": "Kätzchen haben {0} {1} mal entdeckt",
    "act.time.skip": "Kätzchen verbrennen einen Zeitkristall, {0} Jahre übersprungen!",
    "act.trade": "Kätzchen haben {0} Mal mit {1} gehandelt",
    "act.transcend": "{0} Epiphanie ausgegeben, auf T-Level {1} aufgestiegen",
    "blackcoin.buy": "Kätzchen haben deine Relikte verkauft und {0} Blackcoins gekauft",
    "blackcoin.buy.threshold": "Kaufe Blackcoins unter diesem Preis:",
    "blackcoin.buy.trigger": "kaufe Blackcoins (in Relikten)",
    "blackcoin.sell": "Kätzchen haben deine Blackcoins verkauft und {0} Relikte gekauft",
    "blackcoin.sell.threshold": "Blackcoins über diesem Preis verkaufen:",
    "build.embassies": "{0} Botschaften für {1} gebaut",
    "build.embassy": "{0} Botschaft für {1} gebaut",
    "craft.limited": "Herstellen von {0}: im Verhältnis zum Kostenverhältnis begrenzt",
    "craft.unlimited": "Herstellung von {0}: unbegrenzt",
    "dispose.necrocorn": "Kätzchen haben ineffiziente Necrocorns entsorgt",
    "festival.extend": "Kätzchen haben das Festival verlängert",
    "festival.hold": "Kätzchen fangen an, ein Festival abzuhalten",
    "filter.accelerate": "Tempus Fugit",
    "filter.adore": "Verehren",
    "filter.build": "Bauen",
    "filter.craft": "Herstellen",
    "filter.disable": "{0} Protokollnachrichten deaktiviert",
    "filter.distribute": "Verteilen",
    "filter.enable": "{0} Protokollnachrichten aktiviert",
    "filter.explainer": "Disabled items are hidden from the log.",
    "filter.faith": "Orden der Sonne",
    "filter.festival": "Festivals",
    "filter.hunt": "Jagen",
    "filter.misc": "Diverses",
    "filter.praise": "Loben",
    "filter.promote": "Anführer benennen",
    "filter.research": "Erforschen",
    "filter.star": "Astronomische Ereignisse",
    "filter.time.skip": "Zeitsprung",
    "filter.trade": "Handeln",
    "filter.transcend": "Transzendieren",
    "filter.upgrade": "Verbesserungen",
    "option.accelerate": "Tempus Fugit",
    "option.autofeed": "Leviathane füttern",
    "option.catnip": "Gather Catnip",
    "option.chronofurnace": "Chrono-Ofen einschalten",
    "option.crypto": "Blackcoin handeln",
    "option.elect": "Anführer benennen",
    "option.embassies": "Baue Botschaften",
    "option.faith.adore": "Verehre die Galaxie",
    "option.faith.best.unicorn": "Bestes Einhorn-Gebäude zuerst bauen",
    "option.faith.refineTCs": "TCs verfeinern",
    "option.faith.refineTears": "Tränen verfeinern",
    "option.faith.sacrificeAlicorns": "Opfere Alicorns",
    "option.faith.sacrificeUnicorns": "Sacrifice Unicorns",
    "option.faith.transcend": "Transzendieren",
    "option.festival": "Festivals halten",
    "option.fix.cry": "Cryochamber reparieren",
    "option.hunt": "Jagd",
    "option.magnetos": "Magnetos einschalten",
    "option.observe": "Astro-Ereignisse beobachten",
    "option.praise": "Lobe die Sonne",
    "option.promote": "Anführer benennen",
    "option.promotekittens": "Kätzchen befördern",
    "option.shipOverride": "Erzwinge Schiffe zu 243",
    "option.steamworks": "Steamworks einschalten",
    "option.time.reset": "Zeitlinie zurücksetzen (Gefahr!)",
    "option.time.skip": "Zeit überspringen",
    "reset.after": "Schön, dich kennenzulernen, die niedlichen Kätzchenwissenschaftler werden dir dienen",
    "reset.cancel.activity": "Miauston, wir haben ein Problem",
    "reset.cancel.message": "Zeitlinie zurücksetzen abgebrochen",
    "reset.check": "Auslöser für {0} : {1}, du hast {2}",
    "reset.checked": "Alle Bedingungen sind erfüllt, die Zeitllinie wird in den nächsten Sekunden neu gestartet!",
    "reset.countdown.0": "&nbsp;- Temporale Risse geöffnet!",
    "reset.countdown.1": "&nbsp;1 - Start der Zeitmaschine",
    "reset.countdown.10": "10 - Katzenminzeernte",
    "reset.countdown.2": "&nbsp;2 - Chronoforge wird beschleunigt",
    "reset.countdown.3": "&nbsp;3 - Zeit-Risse werden geöffnet",
    "reset.countdown.4": "&nbsp;4 - Satellit wird ausgeschaltet",
    "reset.countdown.5": "&nbsp;5 - Schmelze Blackcoins",
    "reset.countdown.6": "&nbsp;6 - Starte Zeit-Motoren",
    "reset.countdown.7": "&nbsp;7 - Demontage von Strahlenkanonen",
    "reset.countdown.8": "&nbsp;8 - Freisetzung von Echsen",
    "reset.countdown.9": "&nbsp;9 - Opfere Einhörner",
    "reset.last.message": "See you next poincaré recurrence",
    "reset.tip": 'You can cancel this reset by disabling "Enable Scientists" at the top of the settings.',
    "resources.consume.set": "Verbrauchs-Rate für {0}",
    "resources.consume": "Verbrauch: {0}",
    "resources.stock.set": "Lager für {0}",
    "resources.stock": "Lager: {0}",
    "savegame.copied": "Spielstand in Zwischenablage kopiert.",
    "savegame.loaded": "Spielstand geladen.",
    "settings.copied": "Einstellungen in Zwischenablage kopiert.",
    "settings.imported": "Einstellungen importiert.",
    "settings.loaded": "Einstellungen geladen.",
    "state.confirmDestruction": "Bist du sicher?",
    "state.copy": "Copy to clipboard",
    "state.deleted": "Zustand geladen.",
    "state.kgSave": "KG Spielstand",
    "state.kgSaveTitleCopy": "Copy the entire Kittens Game save.",
    "state.kgSaveTitleLoad": "Load an entire Kittens Game save.",
    "state.ksOnly": "Nur KS Einstellungen",
    "state.ksOnlyTitleCopy": "Copy only the settings of Kitten Scientists",
    "state.ksOnlyTitleLoad": "Load only the settings of Kitten Scientists",
    "state.import": "Aus Zwischenablage importieren",
    "state.importTitle": "Store a state that you have in your clipboard.",
    "state.load": "Aus Zwischenablage laden",
    "state.loaded": "Zustand geladen.",
    "state.loadPrompt": "Ihre aktuellen Einstellungen werden ersetzt!\nFügen Sie Ihre Einstellungen hier ein:",
    "state.loadPromptGame": "⚠ YOU WILL LOSE YOUR CURRENT SAVE IF YOU DO THIS! ⚠\nPaste your (un/compressed) savegame here:",
    "state.loadStored": "Load stored state",
    "state.local": "Local states",
    "state.noConfirm": "Do NOT confirm destructive actions. (Danger!)",
    "state.paste": "Paste your (un/compressed) settings here :",
    "state.reset": "Reset to factory defaults",
    "state.resetTitle": "Reset absolutely all KS settings to factory defaults.",
    "state.storeCurrent": "Store current",
    "state.storeCurrentTitle": "Create a new state snapshot.",
    "state.title": "State Management",
    "state.unlabled": "unlabeled state",
    "state.updated": "State updated.",
    "status.auto.disable": "Auto {0} deaktiviert",
    "status.auto.enable": "Auto {0} aktiviert",
    "status.ks.disable": "Deaktiviere die Kätzchenwissenschaftler!",
    "status.ks.enable": "Aktiviere die Kätzchenwissenschaftler!",
    "status.ks.init": "Kitten Scientists initialized.",
    "status.ks.upgrade": "Kitten Scientists {0} (ours is {1}) is available at {2}.",
    "status.reset.check.disable": "Disable check {0} before Reset Timeline",
    "status.reset.check.enable": "Enable check {0} before Reset Timeline",
    "status.resource.disable": "{0} Ressourcenverwaltung deaktiviert",
    "status.resource.enable": "{0} Ressourcenverwaltung aktiviert",
    "status.sub.disable": "{0} deaktiviert",
    "status.sub.enable": "{0} aktiviert",
    "summary.accelerate": "Zeit {0} Mal beschleunigt",
    "summary.adore": "{0} Epiphanie durch das Bewundern der Galaxie akkumuliert",
    "summary.building": "{0} {1} gebaut",
    "summary.craft": "{0} {1} hergestellt",
    "summary.day": "Tag",
    "summary.days": "Tage",
    "summary.distribute": "{0} Kätzchen geholfen einen Job zu finden",
    "summary.embassy": "{0} Botschaften gebaut",
    "summary.feed": "Die Ältesten {0} Necrocorns gefüttert",
    "summary.festival": "{0} Festivals veranstaltet",
    "summary.fix.cry": "{0} Cryochamber repariert",
    "summary.head": "Zusammenfassung der letzten {0} Tage",
    "summary.hunt": "Niedliche Jäger auf {0} Jagden versandt",
    "summary.praise": "Accumulated {0} worship by praising the sun",
    "summary.promote": "Unseren Anführer {0} mal befördert",
    "summary.refine": "{0} {1} verfeinert",
    "summary.separator": " und ",
    "summary.show": "Aktivitäten anzeigen",
    "summary.stars": "{0} Sterne beobachtet",
    "summary.sun": "{0} {1} entdeckt",
    "summary.tech": "{0} erforscht",
    "summary.time.reset.content": "Gained {0} Karma.<br>Gained {1} Paragon",
    "summary.time.reset.title": "Zusammenfassung der letzten {0} Zeitleisten",
    "summary.time.skip": "{0} Jahre übersprungen",
    "summary.trade": "{0} mal mit {1} gehandelt",
    "summary.transcend": "{0} mal aufgestiegen",
    "summary.upgrade": "{0} verbessert",
    "summary.year": "Jahr",
    "summary.years": "Jahre",
    "time.skip.cycle.disable": "Disable time skip in cycle {0} and disallow skip over this cycle",
    "time.skip.cycle.enable": "Enable time skip in cycle {0} and allow skip over this cycle",
    "time.skip.season.disable": "Zeitsprung in {0} deaktiviert",
    "time.skip.season.enable": "Zeitsprung in {0} aktiviert",
    "trade.limited": "Trading with {0}: limited to only occur when profitable based off relative production time",
    "trade.season.disable": "Handel mit {0} in {1} deaktiviert",
    "trade.season.enable": "Handel mit {0} in {1} aktiviert",
    "trade.seasons": "Jahreszeiten",
    "trade.unlimited": "Handel mit {0}: unbegrenzt",
    "ui.build": "Lagerfeuer",
    "ui.buy": "Kauf: {0}",
    "ui.close": "schließen",
    "ui.craft.resources": "Ressourcen",
    "ui.craft": "Werkstatt",
    "ui.cycles": "Zyklen",
    "ui.disable.all": "Alle deaktivieren",
    "ui.distribute": "Dorf",
    "ui.enable.all": "Alle aktivieren",
    "ui.engine": "Wissenschaftler aktivieren",
    "ui.faith": "Religion",
    "ui.filter": "Protokollfilter",
    "ui.itemsHide": "Optionen ausblenden",
    "ui.itemsShow": "Optionen anzeigen",
    "ui.limit": "Begrenzt",
    "ui.max.set": "Maximum für {0}",
    "ui.max": "Max: {0}",
    "ui.maximum": "Maximum",
    "ui.min": "Min. {0}",
    "ui.options": "Optionen",
    "ui.reset": "Auf Standardwerte zurücksetzen",
    "ui.resources": "Ressourcensteuerung",
    "ui.sell": "Verkauf: {0}",
    "ui.space": "Weltraum",
    "ui.time": "Zeit",
    "ui.timeCtrl": "Zeitsteuerung",
    "ui.trade": "Handel",
    "ui.trigger.setinteger": "Geben Sie einen neuen Auslöse-Wert für {0} ein. Sollte im Bereich von 0 bis unendlich (-1) liegen.",
    "ui.trigger.setpercentage": "Geben Sie einen neuen Auslösewert für {0} ein. Sollte im Bereich von 0 bis 1 liegen.",
    "ui.trigger": "Auslöser: {0}",
    "ui.upgrade.buildings": "Gebäude verbessern",
    "ui.upgrade.missions": "Missionen starten",
    "ui.upgrade.policies": "Politik erforschen",
    "ui.upgrade.races": "Neue Völker erforschen",
    "ui.upgrade.techs": "Technologien erforschen",
    "ui.upgrade.upgrades": "Verbesserungen erforschen",
    "ui.upgrade": "Wissenschaft",
    "ui.upgrades": "Upgrades",
    "upgrade.building.amphitheatre": "Amphitheater zu Sendetürmen verbessert!",
    "upgrade.building.aqueduct": "Aquädukte zu Wasserwerken verbessert!",
    "upgrade.building.library": "Bibliotheken zu Rechenzentren verbessert!",
    "upgrade.building.pasture": "Weiden zu Solarfarmen verbessert!",
    "upgrade.building.warehouse": "Upgraded warehouses to spaceports!",
    "upgrade.policy": "Kätzchen haben {0} veranlasst",
    "upgrade.race": "Kätzchen haben die {0} getroffen",
    "upgrade.space.mission": "Kitten haben eine Mission zu {0} durchgeführt",
    "upgrade.space": "Kätzchen haben {0} durchgeführt",
    "upgrade.tech": "Kätzchen haben die Technologie {0} gekauft",
    "upgrade.upgrade": "Kätzchen haben die Verbesserung {0} gekauft"
  };
  const en = {
    "act.accelerate": "Accelerate time!",
    "act.adore": "Adore the galaxy! Accumulated {0} worship to {1} epiphany",
    "act.build": "Kittens have built a new {0}",
    "act.builds": "Kittens have built a new {0} {1} times",
    "act.craft": "Kittens have crafted {0} {1}",
    "act.distribute": "Distributed a kitten to {0}",
    "act.elect": "Kittens have elected a new leader.",
    "act.feed": "Kittens fed the Elders. The elders are pleased",
    "act.fix.cry": "Kittens fixed {0} Cryochambers",
    "act.hunt": "Sent kittens on {0} hunts",
    "act.observe": "Kitten Scientists have observed a star",
    "act.praise": "Praised the sun! Accumulated {0} faith to {1} worship",
    "act.promote": "Kittens' leader has been promoted to rank {0}",
    "act.refineTCs": "Refined {0} time crystals",
    "act.refineTears": "Refined tears into BLS",
    "act.sacrificeAlicorns": "Sacrificed {0} alicorns",
    "act.sacrificeUnicorns": "Sacrificed {0} unicorns",
    "act.sun.discover": "Kittens have discovered {0}",
    "act.sun.discovers": "Kittens have discovered {0} {1} times",
    "act.time.skip": "Kittens combust a time crystal, {0} years skipped!",
    "act.trade": "Kittens have traded {0} times with {1}",
    "act.transcend": "Spent {0} epiphany, Transcended to T-level: {1}",
    "blackcoin.buy": "Kittens sold your Relics and bought {0} Blackcoins",
    "blackcoin.buy.threshold": "Buy Blackcoins below this price:",
    "blackcoin.buy.trigger": "buying Blackcoins (in relics)",
    "blackcoin.sell": "Kittens sold your Blackcoins and bought {0} Relics",
    "blackcoin.sell.threshold": "Sell Blackcoins above this price:",
    "build.embassies": "Built {0} embassies for {1}",
    "build.embassy": "Built {0} embassy for {1}",
    "craft.limited": "Crafting {0}: limited to be proportional to cost ratio",
    "craft.unlimited": "Crafting {0}: unlimited",
    "dispose.necrocorn": "Kittens disposed of inefficient necrocorns",
    "festival.extend": "Kittens extend the festival",
    "festival.hold": "Kittens begin holding a festival",
    "filter.accelerate": "Tempus Fugit",
    "filter.adore": "Adoring",
    "filter.build": "Building",
    "filter.craft": "Crafting",
    "filter.disable": "Disabled {0} log messages",
    "filter.distribute": "Distribute",
    "filter.enable": "Enable {0} log messages",
    "filter.explainer": "Disabled items are hidden from the log.",
    "filter.faith": "Order of the Sun",
    "filter.festival": "Festivals",
    "filter.hunt": "Hunting",
    "filter.misc": "Miscellaneous",
    "filter.praise": "Praising",
    "filter.promote": "Promote leader",
    "filter.research": "Researching",
    "filter.star": "Astronomical Events",
    "filter.time.skip": "Time Skip",
    "filter.trade": "Trading",
    "filter.transcend": "Transcend",
    "filter.upgrade": "Upgrading",
    "option.accelerate": "Tempus Fugit",
    "option.autofeed": "Feed Leviathans",
    "option.catnip": "Gather Catnip",
    "option.chronofurnace": "Turn on Chrono Furnaces",
    "option.crypto": "Trade Blackcoin",
    "option.elect": "Elect leader",
    "option.embassies": "Build Embassies",
    "option.faith.adore": "Adore the Galaxy",
    "option.faith.best.unicorn": "Build Best Unicorn Building First",
    "option.faith.refineTCs": "Refine TCs",
    "option.faith.refineTears": "Refine Tears",
    "option.faith.sacrificeAlicorns": "Sacrifice Alicorns",
    "option.faith.sacrificeUnicorns": "Sacrifice Unicorns",
    "option.faith.transcend": "Transcend",
    "option.festival": "Hold festivals",
    "option.fix.cry": "Fix Cryochamber",
    "option.hunt": "Hunt",
    "option.magnetos": "Turn on Magnetos",
    "option.observe": "Observe Astro Events",
    "option.praise": "Praise the Sun",
    "option.promote": "Promote leader",
    "option.promotekittens": "Promote kittens",
    "option.shipOverride": "Force Ships to 243",
    "option.steamworks": "Turn on Steamworks",
    "option.time.reset": "Reset Timeline (Danger!)",
    "option.time.skip": "Time Skip",
    "reset.after": "Nice to meet you, the cute Kittens Scientists will serve you",
    "reset.cancel.activity": "Meoston, We Have a Problem",
    "reset.cancel.message": "Timeline Reset canceled",
    "reset.check": "Trigger for {0} : {1}, you have {2}",
    "reset.checked": "All conditions are met, the timeline will restart in next few seconds!",
    "reset.countdown.0": "&nbsp;0 - Temporal rifts opened!",
    "reset.countdown.1": "&nbsp;1 - Time engine start",
    "reset.countdown.10": "10 - Harvesting catnip",
    "reset.countdown.2": "&nbsp;2 - Boosting the chronoforge",
    "reset.countdown.3": "&nbsp;3 - Opening temporal rifts",
    "reset.countdown.4": "&nbsp;4 - Turning off satellite",
    "reset.countdown.5": "&nbsp;5 - Melting blackcoins",
    "reset.countdown.6": "&nbsp;6 - Starting time engines",
    "reset.countdown.7": "&nbsp;7 - Disassembling railguns",
    "reset.countdown.8": "&nbsp;8 - Releasing lizards",
    "reset.countdown.9": "&nbsp;9 - Sacrificing Unicorns",
    "reset.last.message": "See you next poincaré recurrence",
    "reset.tip": 'You can cancel this reset by disabling "Enable Scientists" at the top of the settings.',
    "resources.consume.set": "Consume rate for {0}",
    "resources.consume": "Consume: {0}",
    "resources.stock.set": "Stock for {0}",
    "resources.stock": "Stock: {0}",
    "savegame.copied": "Savegame copied to clipboard.",
    "savegame.loaded": "Savegame loaded.",
    "settings.copied": "Settings copied to clipboard.",
    "settings.imported": "Settings imported.",
    "settings.loaded": "Settings loaded.",
    "state.confirmDestruction": "Are you sure?",
    "state.copy": "Copy to clipboard",
    "state.deleted": "State loaded.",
    "state.kgSave": "KG save game",
    "state.kgSaveTitleCopy": "Copy the entire Kittens Game save.",
    "state.kgSaveTitleLoad": "Load an entire Kittens Game save.",
    "state.ksOnly": "KS settings only",
    "state.ksOnlyTitleCopy": "Copy only the settings of Kitten Scientists",
    "state.ksOnlyTitleLoad": "Load only the settings of Kitten Scientists",
    "state.import": "Import from clipboard",
    "state.importTitle": "Store a state that you have in your clipboard.",
    "state.load": "Load from clipboard",
    "state.loaded": "State loaded.",
    "state.loadPrompt": "Your current settings will be replaced!\nPaste your settings here:",
    "state.loadPromptGame": "⚠ YOU WILL LOSE YOUR CURRENT SAVE IF YOU DO THIS! ⚠\nPaste your (un/compressed) savegame here:",
    "state.loadStored": "Load stored state",
    "state.local": "Local states",
    "state.noConfirm": "Do NOT confirm destructive actions. (Danger!)",
    "state.paste": "Paste your (un/compressed) settings here :",
    "state.reset": "Reset to factory defaults",
    "state.resetTitle": "Reset absolutely all KS settings to factory defaults.",
    "state.storeCurrent": "Store current",
    "state.storeCurrentTitle": "Create a new state snapshot.",
    "state.title": "State Management",
    "state.unlabled": "unlabeled state",
    "state.updated": "State updated.",
    "status.auto.disable": "Disable Auto {0}",
    "status.auto.enable": "Enable Auto {0}",
    "status.ks.disable": "Disabling the Kitten Scientists!",
    "status.ks.enable": "Enabling the Kitten Scientists!",
    "status.ks.init": "Kitten Scientists initialized.",
    "status.ks.upgrade": "Kitten Scientists {0} (ours is {1}) is available at {2}.",
    "status.reset.check.disable": "Disable check {0} before Reset Timeline",
    "status.reset.check.enable": "Enable check {0} before Reset Timeline",
    "status.resource.disable": "Disabled {0} resource management",
    "status.resource.enable": "Enabled {0} resource management",
    "status.sub.disable": "Disabled {0}",
    "status.sub.enable": "Enabled {0}",
    "summary.accelerate": "Accelerated time {0} times",
    "summary.adore": "Accumulated {0} epiphany by adoring the galaxy",
    "summary.building": "Built {0} {1}",
    "summary.craft": "Crafted {0} {1}",
    "summary.day": "day",
    "summary.days": "days",
    "summary.distribute": "Helped {0} kittens find a job",
    "summary.embassy": "Built {0} embassies",
    "summary.feed": "Fed the elders {0} necrocorns",
    "summary.festival": "Held {0} festivals",
    "summary.fix.cry": "Fixed {0} cryochambers",
    "summary.head": "Summary of the last {0}",
    "summary.hunt": "Sent adorable kitten hunters on {0} hunts",
    "summary.praise": "Accumulated {0} worship by praising the sun",
    "summary.promote": "Promoted our leader {0} times",
    "summary.refine": "Refined {0} {1}",
    "summary.separator": " and ",
    "summary.show": "Show activity",
    "summary.stars": "Observed {0} stars",
    "summary.sun": "Discovered {0} {1}",
    "summary.tech": "Researched {0}",
    "summary.time.reset.content": "Gained {0} Karma.<br>Gained {1} Paragon",
    "summary.time.reset.title": "Summary of the last {0} timelines",
    "summary.time.skip": "Skiped {0} years",
    "summary.trade": "Traded {0} times with {1}",
    "summary.transcend": "Transcended {0} times",
    "summary.upgrade": "Upgraded {0}",
    "summary.year": "year",
    "summary.years": "years",
    "time.skip.cycle.disable": "Disable time skip in cycle {0} and disallow skip over this cycle",
    "time.skip.cycle.enable": "Enable time skip in cycle {0} and allow skip over this cycle",
    "time.skip.season.disable": "Disable time skip in the {0}",
    "time.skip.season.enable": "Enable time skip in the {0}",
    "trade.limited": "Trading with {0}: limited to only occur when profitable based off relative production time",
    "trade.season.disable": "Disabled trading with {0} in the {1}",
    "trade.season.enable": "Enabled trading with {0} in the {1}",
    "trade.seasons": "seasons",
    "trade.unlimited": "Trading with {0}: unlimited",
    "ui.build": "Bonfire",
    "ui.buy": "Buy: {0}",
    "ui.close": "close",
    "ui.craft.resources": "Resources",
    "ui.craft": "Workshop",
    "ui.cycles": "cycles",
    "ui.disable.all": "disable all",
    "ui.distribute": "Village",
    "ui.enable.all": "enable all",
    "ui.engine": "Enable Scientists",
    "ui.faith": "Religion",
    "ui.filter": "Log Filters",
    "ui.itemsHide": "Hide options",
    "ui.itemsShow": "Show options",
    "ui.limit": "Limited",
    "ui.max.set": "Maximum for {0}",
    "ui.max": "Max: {0}",
    "ui.maximum": "Maximum",
    "ui.min": "Min: {0}",
    "ui.options": "Options",
    "ui.reset": "reset to defaults",
    "ui.resources": "Resource Control",
    "ui.sell": "Sell: {0}",
    "ui.space": "Space",
    "ui.time": "Time",
    "ui.timeCtrl": "Time Control",
    "ui.trade": "Trade",
    "ui.trigger.setinteger": "Enter a new trigger value for {0}. Should be in the range of 0 to Infinity (-1).",
    "ui.trigger.setpercentage": "Enter a new trigger value for {0}. Should be in the range of 0 to 1.",
    "ui.trigger": "Trigger: {0}",
    "ui.upgrade.buildings": "Upgrade buildings",
    "ui.upgrade.missions": "Start missions",
    "ui.upgrade.policies": "Research policies",
    "ui.upgrade.races": "Explore new races",
    "ui.upgrade.techs": "Research technologies",
    "ui.upgrade.upgrades": "Research upgrades",
    "ui.upgrade": "Science",
    "ui.upgrades": "Upgrades",
    "upgrade.building.amphitheatre": "Upgraded amphitheatres to broadcast towers!",
    "upgrade.building.aqueduct": "Upgraded aqueducts to hydro plants!",
    "upgrade.building.library": "Upgraded libraries to data centers!",
    "upgrade.building.pasture": "Upgraded pastures to solar farms!",
    "upgrade.building.warehouse": "Upgraded warehouses to spaceports!",
    "upgrade.policy": "Kittens have passed {0}",
    "upgrade.race": "Kittens met the {0}",
    "upgrade.space.mission": "Kittens conducted a mission to {0}",
    "upgrade.space": "Kittens conducted a {0}",
    "upgrade.tech": "Kittens have bought the tech {0}",
    "upgrade.upgrade": "Kittens have bought the upgrade {0}"
  };
  const he = {
    "act.accelerate": "האץ את הזמן!",
    "act.adore": "העריץ את הגלקסיה! נאסף {0} פולחן ל-{1} תגלית",
    "act.build": "חתלתולים בנו {0} חדש",
    "act.builds": "חתלתולים בנו {0} חדש {1} פעמים",
    "act.craft": "חתלתולים יצרו {0} {1}",
    "act.distribute": "הופץ חתלתול ל-{0}",
    "act.elect": "חתלתולים בחרו מנהיג חדש.",
    "act.feed": "חתלתולים האכילו את העתיקים. העתיקים מרוצים",
    "act.fix.cry": "חתלתולים תיקנו {0} תאי קריו",
    "act.hunt": "נשלחו חתלתולים {0} פעמים לציד",
    "act.observe": "מדעניתלתול צפו בכוכב",
    "act.praise": "הריעו לשמש! נצבר {0} אמונה עבור {1} פולחן",
    "act.promote": "מנהיג החתלתולים קודם לדרגה {0}",
    "act.refineTCs": "זוקקו {0} בדולחי זמן",
    "act.refineTears": "דמעות זוקקו ל-BLS",
    "act.sacrificeAlicorns": "הוקרבו {0} מכונפי קרן",
    "act.sacrificeUnicorns": "Sacrificed {0} unicorns",
    "act.sun.discover": "חתותולים גילו {0}",
    "act.sun.discovers": "חתלתולים גילו {0} {1} פעמים",
    "act.time.skip": "חתלתולים שרפו בדולח זמן, ופסחו על {0} שנים!",
    "act.trade": "חתלתולים סחרו {0} פעמים עם {1}",
    "act.transcend": "נוצל {0} תגלית, התעלה לרמת התעלות: {1}",
    "blackcoin.buy": "חתלתולים מכרו את השרידים שלך ורכשו {0} מטבעותשחור",
    "blackcoin.buy.threshold": "קנה מטבעותשחור מתחת למחיר:",
    "blackcoin.buy.trigger": "קונה מטבעותשחור (בשרידים)",
    "blackcoin.sell": "חתלתולים מחרו את מטבעותשחורתיך ורכשו {0} שרידים",
    "blackcoin.sell.threshold": "מכור מטבעותשחור מעל למחיר:",
    "build.embassies": "נבנו {0} שגרירויות של {1}",
    "build.embassy": "נבנו {0} שגרירויות של {1}",
    "craft.limited": "יוצר {0}: מוגבל לעלות היחסית",
    "craft.unlimited": "יוצר {0}: ללא הגבלה",
    "dispose.necrocorn": "חתלתולים נפטרו מאלמתי קרן לא יעילים",
    "festival.extend": "חתלתולים האריכו את החגיגה",
    "festival.hold": "חתלתולים החלו לערוך חגיגה",
    "filter.accelerate": "הזמן עובר לו",
    "filter.adore": "מעריץ",
    "filter.build": "בנייה",
    "filter.craft": "יצירה",
    "filter.disable": "נכבו {0} רשומות",
    "filter.distribute": "חלוקה",
    "filter.enable": "הופעלו {0} רשומות",
    "filter.explainer": "Disabled items are hidden from the log.",
    "filter.faith": "מסדר השמש",
    "filter.festival": "חגיגות",
    "filter.hunt": "ציד",
    "filter.misc": "שונות",
    "filter.praise": "הילול",
    "filter.promote": "העלאות דרגה",
    "filter.research": "חקר",
    "filter.star": "אירועים אסטרונומיים",
    "filter.time.skip": "קפיצת זמן",
    "filter.trade": "סחר",
    "filter.transcend": "עילוי",
    "filter.upgrade": "שדרוג",
    "option.accelerate": "הזמן עובר לו",
    "option.autofeed": "האכל לוויתנים",
    "option.catnip": "Gather Catnip",
    "option.chronofurnace": "הפעל את כבשני הזמן",
    "option.crypto": "סחור במטבעשחור",
    "option.elect": "בחר מנהיג",
    "option.embassies": "בנה שגרירויות",
    "option.faith.adore": "הערץ את הגלקסיה",
    "option.faith.best.unicorn": "בנה את מבנה החד קרן הטוב ביותר קודם",
    "option.faith.refineTCs": "זקק TCים",
    "option.faith.refineTears": "זקק דמעות",
    "option.faith.sacrificeAlicorns": "הקרב מכונפי קרן",
    "option.faith.sacrificeUnicorns": "Sacrifice Unicorns",
    "option.faith.transcend": "עילוי",
    "option.festival": "ארגן חגיגות",
    "option.fix.cry": "תקן תאי קריו",
    "option.hunt": "צוד",
    "option.magnetos": "הפעל מגנטוים",
    "option.observe": "צפה באירועים אסטרונומיים",
    "option.praise": "הלל את השמש",
    "option.promote": "העלה את דרגת המנהיג",
    "option.promotekittens": "העלה את דרגת החתלתולים",
    "option.shipOverride": "הכרח ספינות ל-243",
    "option.steamworks": "הפעל את מנוע הקיטור",
    "option.time.reset": "אתחל מחדש את ציר הזמן (סכנה!)",
    "option.time.skip": "קפיצת זמן",
    "reset.after": "נעים להכיר, המדעניתלתול החמודים ישרתו אותך",
    "reset.cancel.activity": "מאוסטון, יש לנו בעיה",
    "reset.cancel.message": "אתחול ציר הזמן בוטל",
    "reset.check": "מפעיל עבור {0}: {1}, יש לך {2}",
    "reset.checked": "נענו כל התנאים, ציר הזמן יאותחל בשניות הקרובות!",
    "reset.countdown.0": "&nbsp;0 - נפתחו שערי הזמן!",
    "reset.countdown.1": "&nbsp;1 - מנוע הזמן התחיל",
    "reset.countdown.10": "10 - קוצר נפית חתולים",
    "reset.countdown.2": "&nbsp;2 - מעצים את כבשן הזמן",
    "reset.countdown.3": "&nbsp;3 - פותח את שערי הזמן",
    "reset.countdown.4": "&nbsp;4 - מכבה את הלווין",
    "reset.countdown.5": "&nbsp;5 - ממיס מטבעותשחור",
    "reset.countdown.6": "&nbsp;6 - מתחיל את מנועי הזמן",
    "reset.countdown.7": "&nbsp;7 - מפרק רובי רכבת",
    "reset.countdown.8": "&nbsp;8 - משחרר לטאות",
    "reset.countdown.9": "&nbsp;9 - מקריב חדי קרן",
    "reset.last.message": "נתראה בהישנות פואנקרה הבאה",
    "reset.tip": 'You can cancel this reset by disabling "Enable Scientists" at the top of the settings.',
    "resources.consume.set": "קצב צריכה עבור {0}",
    "resources.consume": "צרוך: {0}",
    "resources.stock.set": "מצבור עבור {0}",
    "resources.stock": "מצבור: {0}",
    "savegame.copied": "השמירה הועתקה ללוח העתקה.",
    "savegame.loaded": "שמירה נטענה.",
    "settings.copied": "הגדרות הועתקו ללוח העתקה.",
    "settings.imported": "הגדרות יובאו.",
    "settings.loaded": "הגדרות נטענו.",
    "state.confirmDestruction": "האם אתה בטוח?",
    "state.copy": "Copy to clipboard",
    "state.deleted": "הסביבה נטענה.",
    "state.kgSave": "KG save game",
    "state.kgSaveTitleCopy": "Copy the entire Kittens Game save.",
    "state.kgSaveTitleLoad": "Load an entire Kittens Game save.",
    "state.ksOnly": "KS settings only",
    "state.ksOnlyTitleCopy": "Copy only the settings of Kitten Scientists",
    "state.ksOnlyTitleLoad": "Load only the settings of Kitten Scientists",
    "state.import": "Import from clipboard",
    "state.importTitle": "Store a state that you have in your clipboard.",
    "state.load": "Load from clipboard",
    "state.loaded": "הסביבה נטענה.",
    "state.loadPrompt": "Your current settings will be replaced!\nPaste your settings here:",
    "state.loadPromptGame": "⚠ YOU WILL LOSE YOUR CURRENT SAVE IF YOU DO THIS! ⚠\nPaste your (un/compressed) savegame here:",
    "state.loadStored": "Load stored state",
    "state.local": "Local states",
    "state.noConfirm": "Do NOT confirm destructive actions. (Danger!)",
    "state.paste": "Paste your (un/compressed) settings here :",
    "state.reset": "Reset to factory defaults",
    "state.resetTitle": "Reset absolutely all KS settings to factory defaults.",
    "state.storeCurrent": "Store current",
    "state.storeCurrentTitle": "Create a new state snapshot.",
    "state.title": "State Management",
    "state.unlabled": "unlabeled state",
    "state.updated": "State updated.",
    "status.auto.disable": "כבה {0} אוטומטי",
    "status.auto.enable": "הפעל {0} אוטומטי",
    "status.ks.disable": "מבטל את המדעניתלתול!",
    "status.ks.enable": "מאפשר את המדעניתלתול!",
    "status.ks.init": "Kitten Scientists initialized.",
    "status.ks.upgrade": "Kitten Scientists {0} (ours is {1}) is available at {2}.",
    "status.reset.check.disable": "כבה בדיקת {0} לפני איפוס ציר הזמן",
    "status.reset.check.enable": "הדלק בדיקת {0} לפני איפוס ציר הזמן",
    "status.resource.disable": "כבה ניהול משאבי {0}",
    "status.resource.enable": "הפעל ניהול משאבי {0}",
    "status.sub.disable": "{0} הושבת",
    "status.sub.enable": "{0} אופשר",
    "summary.accelerate": "הזמן הועץ {0} פעמים",
    "summary.adore": "נצבר {0} תגלית על ידי הערצת הגלקסיה",
    "summary.building": "נבנה {0} {1}",
    "summary.craft": "נוצר {0} {1}",
    "summary.day": "יום",
    "summary.days": "ימים",
    "summary.distribute": "עזרת ל-{0} חתלתולים למצוא עבודה",
    "summary.embassy": "נבנו {0} שגרירויות",
    "summary.feed": "האכלת את הוותיקים {0} אלמתי קרן",
    "summary.festival": "אורגנו {0} חגיגות",
    "summary.fix.cry": "תוקנו {0} תאי קריו",
    "summary.head": "תקציר {0} האחרונים",
    "summary.hunt": "צידיתלתול יצאו לצוד {0} פעמים",
    "summary.praise": "נצבר {0} פולחן על ידי הילול השמש",
    "summary.promote": "המנהיג קודם {0} פעמים",
    "summary.refine": "זוקק {0} {1}",
    "summary.separator": " ועוד ",
    "summary.show": "הצג פעילות",
    "summary.stars": "נצפו {0} כוכבים",
    "summary.sun": "התגלו {0} {1}",
    "summary.tech": "נחקרו {0}",
    "summary.time.reset.content": "נאסף {0} קרמה.<br>נאסף {1} מופת",
    "summary.time.reset.title": "סיכום {0} צירי הזמן האחרונים",
    "summary.time.skip": "{0} שנים נפסחו",
    "summary.trade": "סחרת {0} פעמים עם {1}",
    "summary.transcend": "התעלית {0} פעמים",
    "summary.upgrade": "שודרג {0}",
    "summary.year": "שנה",
    "summary.years": "שנים",
    "time.skip.cycle.disable": "בטל קפיצת זמן בפרק זמן {0} ואל תאפשר לקפוץ על פרק זמן זה",
    "time.skip.cycle.enable": "אפשר קפיצת זמן בפרק זמן {0} ואפשר לפסוח על פרק זמן זה",
    "time.skip.season.disable": "בטל קפיצת זמן עבור {0}",
    "time.skip.season.enable": "אפשר קפיצת זמן עבור {0}",
    "trade.limited": "סחר עם {0}: מוגבל רק כאשר זה רווחי ביחס לזמן ייצור",
    "trade.season.disable": "בוטל הסחר עם {0} עבור {1}",
    "trade.season.enable": "אופשר הסחר עם {0} עבור {1}",
    "trade.seasons": "עונות",
    "trade.unlimited": "סחר עם {0}: ללא הגבלה",
    "ui.build": "מדורה",
    "ui.buy": "קנה: {0}",
    "ui.close": "סגור",
    "ui.craft.resources": "משאבים",
    "ui.craft": "סדנא",
    "ui.cycles": "מחזורים",
    "ui.disable.all": "השבת הכל",
    "ui.distribute": "כפר",
    "ui.enable.all": "אפשר הכל",
    "ui.engine": "אפשר מדענים",
    "ui.faith": "דת",
    "ui.filter": "סנני רשומות",
    "ui.itemsHide": "הסתר אפשרויות",
    "ui.itemsShow": "הצג אפשרויות",
    "ui.limit": "מוגבל",
    "ui.max.set": "מירבי עבור {0}",
    "ui.max": "מירבי: {0}",
    "ui.maximum": "מירבי",
    "ui.min": "מינימלי: {0}",
    "ui.options": "אפשרויות",
    "ui.reset": "אפס לברירת מחדר",
    "ui.resources": "בקרת משאבים",
    "ui.sell": "מכור: {0}",
    "ui.space": "חלל",
    "ui.time": "זמן",
    "ui.timeCtrl": "שליטה בזמן",
    "ui.trade": "סחר",
    "ui.trigger.setinteger": "הכנס ערך הפעלה חדש עבור {0}. צריך להיות בטווח שבין 0 עד אינסוף (-1).",
    "ui.trigger.setpercentage": "הכנס ערך הפעלה חדש עבור {0}. צריך להיות בטווח שבין 0 עד 1.",
    "ui.trigger": "מפעיל: {0}",
    "ui.upgrade.buildings": "שדרג בניינים",
    "ui.upgrade.missions": "התחל משימות",
    "ui.upgrade.policies": "פוליסת מחקר",
    "ui.upgrade.races": "גלה גזעים חדשים",
    "ui.upgrade.techs": "חקור טכנולוגיות",
    "ui.upgrade.upgrades": "חקור שדרוגים",
    "ui.upgrade": "מדע",
    "ui.upgrades": "Upgrades",
    "upgrade.building.amphitheatre": "אמפיטאטראות שודרגו למגדלי שידור!",
    "upgrade.building.aqueduct": "אקוודוקטים שודרגו למפעלי מים!",
    "upgrade.building.library": "ספריות שודרגו למרכזיות מידע!",
    "upgrade.building.pasture": "אדמות חקלאיות שודרגו לשדות קולטני שמש!",
    "upgrade.building.warehouse": "Upgraded warehouses to spaceports!",
    "upgrade.policy": "חתלתולים העבירו {0}",
    "upgrade.race": "חתלתולים פגשו את {0}",
    "upgrade.space.mission": "חתלתולים ביצעו משימה אל {0}",
    "upgrade.space": "חתלתולים ביצעו {0}",
    "upgrade.tech": "חתלתולים קנו את הטכנולוגיה {0}",
    "upgrade.upgrade": "חתלתולים קנו את השדרוג {0}"
  };
  const zh = {
    "act.accelerate": "固有时制御，二倍速!",
    "act.adore": "赞美群星! 转化 {0} 虔诚为 {1} 顿悟",
    "act.build": "小猫建造了一个 {0}",
    "act.builds": "小猫建造了 {1} 个新的 {0}",
    "act.craft": "小猫制作了 {0} {1}",
    "act.distribute": "分配一只猫猫成为 {0}",
    "act.elect": "小猫选出了一位新领导人",
    "act.feed": "小猫向上古神献上祭品。上古神很高兴",
    "act.fix.cry": "小猫修复了 {0} 个冷冻仓",
    "act.hunt": "派出 {0} 波小猫去打猎",
    "act.observe": "小猫珂学家观测到一颗流星",
    "act.praise": "赞美太阳! 转化 {0} 信仰为 {1} 虔诚",
    "act.promote": "领袖被提拔到 {0} 级",
    "act.refineTCs": "精炼 {0} 时间水晶",
    "act.refineTears": "提炼眼泪到BLS",
    "act.sacrificeAlicorns": "Sacrificed alicorns",
    "act.sacrificeUnicorns": "Sacrificed {0} unicorns",
    "act.sun.discover": "小猫在 {0} 方面获得顿悟",
    "act.sun.discovers": "小猫在 {0} 方面获得 {1} 次顿悟",
    "act.time.skip": "燃烧时间水晶, 跳过接下来的 {0} 年!",
    "act.trade": "小猫与 {1} 交易 {0} 次",
    "act.transcend": "消耗 {0} 顿悟，达到超越 {1}",
    "blackcoin.buy": "小猫出售遗物并买入 {0} 黑币",
    "blackcoin.buy.threshold": "以低于此价格购买黑币：",
    "blackcoin.buy.trigger": "购买黑币(遗迹)",
    "blackcoin.sell": "小猫出售黑币并买入了 {0} 遗物",
    "blackcoin.sell.threshold": "以高于此价格出售黑币：",
    "build.embassies": "在 {1} 设立了 {0} 个大使馆",
    "build.embassy": "在 {1} 设立了 {0} 个大使馆",
    "craft.limited": "制作 {0} 受库存消耗比率的限制",
    "craft.unlimited": "制作 {0} 不受限制",
    "dispose.necrocorn": "小猫处理掉了影响效率的多余死灵兽",
    "festival.extend": "小猫延长了节日",
    "festival.hold": "小猫开始举办节日",
    "filter.accelerate": "时间加速",
    "filter.adore": "赞美群星",
    "filter.build": "建筑",
    "filter.craft": "工艺",
    "filter.disable": "取消过滤 {0}",
    "filter.distribute": "猫口分配",
    "filter.enable": "过滤 {0}",
    "filter.explainer": "Disabled items are hidden from the log.",
    "filter.faith": "太阳秩序",
    "filter.festival": "节日",
    "filter.hunt": "狩猎",
    "filter.misc": "杂项",
    "filter.praise": "赞美太阳",
    "filter.promote": "提拔领袖",
    "filter.research": "研究",
    "filter.star": "天文事件",
    "filter.time.skip": "时间跳转",
    "filter.trade": "贸易",
    "filter.transcend": "超越",
    "filter.upgrade": "升级",
    "option.accelerate": "时间加速",
    "option.autofeed": "献祭上古神",
    "option.catnip": "Gather Catnip",
    "option.chronofurnace": "开启计时炉",
    "option.crypto": "黑币交易",
    "option.elect": "选择领导人",
    "option.embassies": "建造大使馆",
    "option.faith.adore": "赞美群星",
    "option.faith.best.unicorn": "优先最佳独角兽建筑",
    "option.faith.refineTCs": "精炼时间水晶",
    "option.faith.refineTears": "提炼眼泪",
    "option.faith.sacrificeAlicorns": "献祭独角兽",
    "option.faith.sacrificeUnicorns": "Sacrifice Unicorns",
    "option.faith.transcend": "自动超越",
    "option.festival": "举办节日",
    "option.fix.cry": "修复冷冻仓",
    "option.hunt": "狩猎",
    "option.magnetos": "开启磁电机",
    "option.observe": "观测天文事件",
    "option.praise": "赞美太阳",
    "option.promote": "提拔领袖",
    "option.promotekittens": "提拔小猫",
    "option.shipOverride": "强制243船",
    "option.steamworks": "启动蒸汽工房",
    "option.time.reset": "重启时间线 (危险!)",
    "option.time.skip": "时间跳转",
    "reset.after": "初次见面，可爱的猫猫科学家为您服务",
    "reset.cancel.activity": "喵斯顿，我们有麻烦了",
    "reset.cancel.message": "重启时间线计划取消",
    "reset.check": "{0} 的触发值: {1}, 现在共有 {2}",
    "reset.checked": "所有条件都已满足，时间线将在几秒后重启!",
    "reset.countdown.0": "&nbsp;0 - 时空裂缝已打开!",
    "reset.countdown.1": "&nbsp;1 - 时间引擎已启动!",
    "reset.countdown.10": "10 - 正在收获猫薄荷",
    "reset.countdown.2": "&nbsp;2 - 正在启动时间锻造",
    "reset.countdown.3": "&nbsp;3 - 正在打开时空裂隙",
    "reset.countdown.4": "&nbsp;4 - 正在关闭卫星",
    "reset.countdown.5": "&nbsp;5 - 正在融化黑币",
    "reset.countdown.6": "&nbsp;6 - 正在启动时间引擎",
    "reset.countdown.7": "&nbsp;7 - 正在拆解电磁炮",
    "reset.countdown.8": "&nbsp;8 - 正在放生蜥蜴",
    "reset.countdown.9": "&nbsp;9 - 正在献祭独角兽",
    "reset.last.message": "我们下个庞加莱回归再见",
    "reset.tip": 'You can cancel this reset by disabling "Enable Scientists" at the top of the settings.',
    "resources.consume.set": "设置 {0} 的消耗率",
    "resources.consume": "消耗率: {0}",
    "resources.stock.set": "设置 {0} 的库存",
    "resources.stock": "库存: {0}",
    "savegame.copied": "Savegame copied to clipboard.",
    "savegame.loaded": "Savegame loaded.",
    "settings.copied": "Settings copied to clipboard.",
    "settings.imported": "Settings imported.",
    "settings.loaded": "已载入设置。",
    "state.confirmDestruction": "你确定吗？",
    "state.copy": "Copy to clipboard",
    "state.deleted": "已载入状态。",
    "state.kgSave": "KG save game",
    "state.kgSaveTitleCopy": "Copy the entire Kittens Game save.",
    "state.kgSaveTitleLoad": "Load an entire Kittens Game save.",
    "state.ksOnly": "KS settings only",
    "state.ksOnlyTitleCopy": "Copy only the settings of Kitten Scientists",
    "state.ksOnlyTitleLoad": "Load only the settings of Kitten Scientists",
    "state.import": "Import from clipboard",
    "state.importTitle": "Store a state that you have in your clipboard.",
    "state.load": "Load from clipboard",
    "state.loaded": "已载入状态。",
    "state.loadPrompt": "Your current settings will be replaced!\nPaste your settings here:",
    "state.loadPromptGame": "⚠ YOU WILL LOSE YOUR CURRENT SAVE IF YOU DO THIS! ⚠\nPaste your (un/compressed) savegame here:",
    "state.loadStored": "Load stored state",
    "state.local": "Local states",
    "state.noConfirm": "Do NOT confirm destructive actions. (Danger!)",
    "state.paste": "Paste your (un/compressed) settings here :",
    "state.reset": "Reset to factory defaults",
    "state.resetTitle": "Reset absolutely all KS settings to factory defaults.",
    "state.storeCurrent": "Store current",
    "state.storeCurrentTitle": "Create a new state snapshot.",
    "state.title": "State Management",
    "state.unlabled": "unlabeled state",
    "state.updated": "State updated.",
    "status.auto.disable": "禁用自动化 {0}",
    "status.auto.enable": "启用自动化 {0}",
    "status.ks.disable": "太敬业了，该歇了",
    "status.ks.enable": "神说，要有猫猫珂学家!",
    "status.ks.init": "Kitten Scientists initialized.",
    "status.ks.upgrade": "Kitten Scientists {0} (ours is {1}) is available at {2}.",
    "status.reset.check.disable": "在重启时间线前不检查 {0}",
    "status.reset.check.enable": "在重启时间线前检查 {0}",
    "status.resource.disable": "Disabled {0} resource management",
    "status.resource.enable": "Enabled {0} resource management",
    "status.sub.disable": "禁用 {0}",
    "status.sub.enable": "启用 {0}",
    "summary.accelerate": "加速时间 {0} 次",
    "summary.adore": "通过赞美群星积累了 {0} 顿悟",
    "summary.building": "建造了 {0} 个 {1}",
    "summary.craft": "制作了 {0} 个 {1}",
    "summary.day": "天",
    "summary.days": "天",
    "summary.distribute": "帮助 {0} 只猫猫找到工作",
    "summary.embassy": "设立了 {0} 个大使馆",
    "summary.feed": "向上古神献祭 {0} 只死灵兽",
    "summary.festival": "举办了 {0} 次节日",
    "summary.fix.cry": "修复了 {0} 个冷冻仓",
    "summary.head": "过去 {0} 的总结",
    "summary.hunt": "派出了 {0} 批可爱的小猫猎人",
    "summary.praise": "通过赞美太阳积累了 {0} 虔诚",
    "summary.promote": "提拔领袖 {0} 次",
    "summary.refine": "Refined {0} {1}",
    "summary.separator": " ",
    "summary.show": "总结",
    "summary.stars": "观测了 {0} 颗流星",
    "summary.sun": "在 {1} 方面顿悟 {0} 次",
    "summary.tech": "掌握了 {0}",
    "summary.time.reset.content": "获得 {0} 业.<br>获得 {1} 领导力",
    "summary.time.reset.title": "过去 {0} 个时间线的总结",
    "summary.time.skip": "跳过 {0} 年",
    "summary.trade": "与 {1} 贸易了 {0} 次",
    "summary.transcend": "超越了 {0} 次",
    "summary.upgrade": "发明了 {0}",
    "summary.year": "年",
    "summary.years": "年",
    "time.skip.cycle.disable": "停止在 {0} 跳转时间并禁止跳过该周期",
    "time.skip.cycle.enable": "启用在 {0} 跳转时间并允许跳过该周期",
    "time.skip.season.disable": "停止在 {0} 跳转时间",
    "time.skip.season.enable": "启用在 {0} 跳转时间",
    "trade.limited": "与 {0} 的交易限制为比产量更优时才会触发",
    "trade.season.disable": "停止在 {1} 与 {0} 的交易",
    "trade.season.enable": "启用在 {1} 与 {0} 的交易",
    "trade.seasons": "季节",
    "trade.unlimited": "取消与 {0} 交易的限制",
    "ui.build": "营火",
    "ui.buy": "Buy: {0}",
    "ui.close": "关闭",
    "ui.craft.resources": "资源",
    "ui.craft": "工艺",
    "ui.cycles": "周期",
    "ui.disable.all": "全部禁用",
    "ui.distribute": "猫力资源",
    "ui.enable.all": "全部启用",
    "ui.engine": "启用小猫珂学家",
    "ui.faith": "宗教",
    "ui.filter": "日志过滤",
    "ui.itemsHide": "隐藏选项",
    "ui.itemsShow": "显示选项",
    "ui.limit": "限制",
    "ui.max.set": "设置 {0} 的最大值",
    "ui.max": "最大值：{0}",
    "ui.maximum": "上限",
    "ui.min": "最小值 {0}",
    "ui.options": "选项",
    "ui.reset": "恢复至默认",
    "ui.resources": "Resource Control",
    "ui.sell": "卖出：{0}",
    "ui.space": "太空",
    "ui.time": "时间",
    "ui.timeCtrl": "时间操纵",
    "ui.trade": "贸易",
    "ui.trigger.setinteger": "Enter a new trigger value for {0}. Should be in the range of 0 to Infinity (-1).",
    "ui.trigger.setpercentage": "输入新的 {0} 触发值，取值范围为 0 到 1 的小数。",
    "ui.trigger": "Trigger: {0}",
    "ui.upgrade.buildings": "建筑",
    "ui.upgrade.missions": "探索星球",
    "ui.upgrade.policies": "政策",
    "ui.upgrade.races": "探险队出发!",
    "ui.upgrade.techs": "科技",
    "ui.upgrade.upgrades": "升级",
    "ui.upgrade": "升级",
    "ui.upgrades": "Upgrades",
    "upgrade.building.amphitheatre": "剧场 升级为 广播塔!",
    "upgrade.building.aqueduct": "水渠 升级为 水电站 !",
    "upgrade.building.library": "图书馆 升级为 数据中心!",
    "upgrade.building.pasture": "牧场 升级为 太阳能发电站 !",
    "upgrade.building.warehouse": "Upgraded warehouses to spaceports!",
    "upgrade.policy": "小猫通过了 {0} 法案",
    "upgrade.race": "小猫遇到了 {0}",
    "upgrade.space.mission": "小猫执行了 {0} 的任务",
    "upgrade.space": "小猫执行了 {0}",
    "upgrade.tech": "小猫掌握了 {0}",
    "upgrade.upgrade": "小猫发明了 {0}"
  };
  var UnicornItemVariant = /* @__PURE__ */ ((UnicornItemVariant2) => {
    UnicornItemVariant2["Cryptotheology"] = "c";
    UnicornItemVariant2["OrderOfTheSun"] = "s";
    UnicornItemVariant2["Ziggurat"] = "z";
    UnicornItemVariant2["UnicornPasture"] = "zp";
    return UnicornItemVariant2;
  })(UnicornItemVariant || {});
  var TimeItemVariant = /* @__PURE__ */ ((TimeItemVariant2) => {
    TimeItemVariant2["Chronoforge"] = "chrono";
    TimeItemVariant2["VoidSpace"] = "void";
    return TimeItemVariant2;
  })(TimeItemVariant || {});
  class ReligionSettingsItem extends SettingMax {
    constructor(building, variant, enabled = false, max = -1) {
      super(enabled, max);
      __privateAdd(this, _building2, void 0);
      __privateAdd(this, _variant, void 0);
      __privateSet(this, _building2, building);
      __privateSet(this, _variant, variant);
    }
    get building() {
      return __privateGet(this, _building2);
    }
    get variant() {
      return __privateGet(this, _variant);
    }
  }
  _building2 = new WeakMap();
  _variant = new WeakMap();
  class ReligionSettings extends SettingTrigger {
    constructor(enabled = false, trigger = 1, buildings = {
      apocripha: new ReligionSettingsItem("apocripha", UnicornItemVariant.OrderOfTheSun, false, -1),
      basilica: new ReligionSettingsItem("basilica", UnicornItemVariant.OrderOfTheSun, true, -1),
      blackCore: new ReligionSettingsItem(
        "blackCore",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      blackLibrary: new ReligionSettingsItem(
        "blackLibrary",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      blackNexus: new ReligionSettingsItem(
        "blackNexus",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      blackObelisk: new ReligionSettingsItem(
        "blackObelisk",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      blackPyramid: new ReligionSettingsItem(
        "blackPyramid",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      ),
      blackRadiance: new ReligionSettingsItem(
        "blackRadiance",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      blazar: new ReligionSettingsItem("blazar", UnicornItemVariant.Cryptotheology, false, -1),
      darkNova: new ReligionSettingsItem("darkNova", UnicornItemVariant.Cryptotheology, false, -1),
      goldenSpire: new ReligionSettingsItem(
        "goldenSpire",
        UnicornItemVariant.OrderOfTheSun,
        true,
        -1
      ),
      holyGenocide: new ReligionSettingsItem(
        "holyGenocide",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      ivoryCitadel: new ReligionSettingsItem(
        "ivoryCitadel",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      ),
      ivoryTower: new ReligionSettingsItem("ivoryTower", UnicornItemVariant.Ziggurat, false, -1),
      marker: new ReligionSettingsItem("marker", UnicornItemVariant.Ziggurat, false, -1),
      scholasticism: new ReligionSettingsItem(
        "scholasticism",
        UnicornItemVariant.OrderOfTheSun,
        true,
        -1
      ),
      singularity: new ReligionSettingsItem(
        "singularity",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      skyPalace: new ReligionSettingsItem("skyPalace", UnicornItemVariant.Ziggurat, false, -1),
      solarchant: new ReligionSettingsItem(
        "solarchant",
        UnicornItemVariant.OrderOfTheSun,
        true,
        -1
      ),
      solarRevolution: new ReligionSettingsItem(
        "solarRevolution",
        UnicornItemVariant.OrderOfTheSun,
        true,
        -1
      ),
      stainedGlass: new ReligionSettingsItem(
        "stainedGlass",
        UnicornItemVariant.OrderOfTheSun,
        true,
        -1
      ),
      sunAltar: new ReligionSettingsItem("sunAltar", UnicornItemVariant.OrderOfTheSun, true, -1),
      sunspire: new ReligionSettingsItem("sunspire", UnicornItemVariant.Ziggurat, false, -1),
      templars: new ReligionSettingsItem("templars", UnicornItemVariant.OrderOfTheSun, true, -1),
      transcendence: new ReligionSettingsItem(
        "transcendence",
        UnicornItemVariant.OrderOfTheSun,
        true,
        -1
      ),
      unicornGraveyard: new ReligionSettingsItem(
        "unicornGraveyard",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      ),
      unicornNecropolis: new ReligionSettingsItem(
        "unicornNecropolis",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      ),
      unicornPasture: new ReligionSettingsItem(
        "unicornPasture",
        UnicornItemVariant.UnicornPasture,
        true,
        -1
      ),
      unicornTomb: new ReligionSettingsItem("unicornTomb", UnicornItemVariant.Ziggurat, false, -1),
      unicornUtopia: new ReligionSettingsItem(
        "unicornUtopia",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      )
    }, bestUnicornBuilding = new Setting(false), sacrificeAlicorns = new SettingTrigger(false, 25), sacrificeUnicorns = new SettingTrigger(false, 1e6), refineTears = new SettingTrigger(false, 1e4), refineTimeCrystals = new SettingTrigger(false, 15e3), autoPraise = new SettingTrigger(true, 0.98), adore = new SettingTrigger(false, 0.75), transcend = new Setting(false)) {
      super(enabled, trigger);
      __publicField(this, "buildings");
      /**
       * Build best unicorn building first.
       */
      __publicField(this, "bestUnicornBuilding");
      /**
       * Sacrifice alicorns for time crystals.
       */
      __publicField(this, "sacrificeAlicorns");
      /**
       * Sacrifice unicorns for tears.
       */
      __publicField(this, "sacrificeUnicorns");
      /**
       * Refine tears into BLS.
       */
      __publicField(this, "refineTears");
      /**
       * Refine time crystals into relics.
       */
      __publicField(this, "refineTimeCrystals");
      /**
       * Praise the sun.
       */
      __publicField(this, "autoPraise");
      /**
       * Adore the galaxy.
       */
      __publicField(this, "adore");
      /**
       * Transcend.
       */
      __publicField(this, "transcend");
      this.buildings = buildings;
      this.bestUnicornBuilding = bestUnicornBuilding;
      this.sacrificeAlicorns = sacrificeAlicorns;
      this.sacrificeUnicorns = sacrificeUnicorns;
      this.refineTears = refineTears;
      this.refineTimeCrystals = refineTimeCrystals;
      this.autoPraise = autoPraise;
      this.adore = adore;
      this.transcend = transcend;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.max = (item == null ? void 0 : item.max) ?? building.max;
      });
      this.bestUnicornBuilding.load(settings.bestUnicornBuilding);
      this.sacrificeAlicorns.load(settings.sacrificeAlicorns);
      this.sacrificeUnicorns.load(settings.sacrificeUnicorns);
      this.refineTears.load(settings.refineTears);
      this.refineTimeCrystals.load(settings.refineTimeCrystals);
      this.autoPraise.load(settings.autoPraise);
      this.adore.load(settings.adore);
      this.transcend.load(settings.transcend);
    }
  }
  class ReligionManager {
    constructor(host, bonfireManager, workshopManager, settings = new ReligionSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_bulkManager");
      __publicField(this, "_bonfireManager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Religion");
      this._workshopManager = workshopManager;
      this._bulkManager = new BulkPurchaseHelper(this._host, this._workshopManager);
      this._bonfireManager = bonfireManager;
    }
    async tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      this._autoBuild();
      if (this.settings.sacrificeUnicorns.enabled) {
        this._autoSacrificeUnicorns();
      }
      if (this.settings.sacrificeAlicorns.enabled) {
        await this._autoSacrificeAlicorns();
      }
      if (this.settings.refineTears.enabled) {
        await this._autoTears();
      }
      if (this.settings.refineTimeCrystals.enabled) {
        await this._autoTCs();
      }
      this._autoTAP();
    }
    _autoBuild() {
      if (this.settings.bestUnicornBuilding.enabled) {
        this._buildBestUnicornBuilding();
        this._buildNonUnicornBuildings();
      } else {
        const builds = Object.fromEntries(
          Object.entries(this.settings.buildings).filter(
            ([k, v]) => v.variant !== UnicornItemVariant.UnicornPasture
          )
        );
        const maxPastures = -1 === this.settings.buildings.unicornPasture.max ? Number.POSITIVE_INFINITY : this.settings.buildings.unicornPasture.max;
        const meta = this._host.game.bld.getBuildingExt("unicornPasture").meta;
        if (this.settings.buildings.unicornPasture.enabled && meta.val < maxPastures) {
          this._bonfireManager.autoBuild({
            unicornPasture: new BonfireBuildingSetting(
              "unicornPasture",
              this.settings.buildings.unicornPasture.enabled,
              this.settings.buildings.unicornPasture.max
            )
          });
        }
        this._buildReligionBuildings(builds);
      }
    }
    _buildBestUnicornBuilding() {
      const bestUnicornBuilding = this.getBestUnicornBuilding();
      if (bestUnicornBuilding === null) {
        return;
      }
      if (bestUnicornBuilding === "unicornPasture") {
        this._bonfireManager.build(bestUnicornBuilding, 0, 1);
      } else {
        const buildingButton = mustExist(
          this.getBuildButton(bestUnicornBuilding, UnicornItemVariant.Ziggurat)
        );
        let tearsNeeded = 0;
        const priceTears = mustExist(mustExist(buildingButton.model).prices).find(
          (subject) => subject.name === "tears"
        );
        if (!isNil(priceTears)) {
          tearsNeeded = priceTears.val;
        }
        const tearsAvailableForUse = this._workshopManager.getValue("tears") - this._workshopManager.getStock("tears");
        if (!isNil(this._host.game.religionTab.sacrificeBtn) && tearsAvailableForUse < tearsNeeded) {
          const maxSacrifice = Math.floor(
            (this._workshopManager.getValue("unicorns") - this._workshopManager.getStock("unicorns")) / 2500
          );
          const needSacrifice = Math.ceil(
            (tearsNeeded - tearsAvailableForUse) / this._host.game.bld.getBuildingExt("ziggurat").meta.on
          );
          if (needSacrifice < maxSacrifice) {
            this._host.game.religionTab.sacrificeBtn.controller._transform(
              this._host.game.religionTab.sacrificeBtn.model,
              needSacrifice
            );
          } else {
            return;
          }
        }
        const buildRequest = { [bestUnicornBuilding]: this.settings.buildings[bestUnicornBuilding] };
        const build = this._bulkManager.bulk(
          buildRequest,
          this.getBuildMetaData(buildRequest),
          this.settings.trigger
        );
        if (0 < build.length && 0 < build[0].count) {
          this.build(bestUnicornBuilding, UnicornItemVariant.Ziggurat, 1);
        }
      }
    }
    _buildNonUnicornBuildings() {
      const alreadyHandled = [
        "unicornPasture",
        "unicornTomb",
        "ivoryTower",
        "ivoryCitadel",
        "skyPalace",
        "unicornUtopia",
        "sunspire"
      ];
      const builds = Object.fromEntries(
        Object.entries(this.settings.buildings).filter(
          ([k, v]) => !alreadyHandled.includes(v.building)
        )
      );
      this._buildReligionBuildings(builds);
    }
    _buildReligionBuildings(builds) {
      this.manager.render();
      const metaData = this.getBuildMetaData(builds);
      const buildList = this._bulkManager.bulk(builds, metaData, this.settings.trigger);
      let refreshRequired = false;
      for (const build of buildList) {
        if (0 < build.count) {
          this.build(
            build.id,
            mustExist(build.variant),
            build.count
          );
          refreshRequired = true;
        }
      }
      if (refreshRequired) {
        this._host.game.ui.render();
      }
    }
    /**
     * Determine the best unicorn-related building to buy next.
     * This is the building where the cost is in the best proportion to the
     * unicorn production bonus it generates.
     *
     * @see https://github.com/Bioniclegenius/NummonCalc/blob/112f716e2fde9956dfe520021b0400cba7b7113e/NummonCalc.js#L490
     * @returns The best unicorn building.
     */
    getBestUnicornBuilding() {
      const pastureButton = this._bonfireManager.getBuildButton("unicornPasture");
      if (pastureButton === null) {
        return null;
      }
      const validBuildings = [
        "unicornTomb",
        "ivoryTower",
        "ivoryCitadel",
        "skyPalace",
        "unicornUtopia",
        "sunspire"
      ];
      const unicornsPerSecondBase = this._host.game.getEffect("unicornsPerTickBase") * this._host.game.getTicksPerSecondUI();
      const globalRatio = this._host.game.getEffect("unicornsGlobalRatio") + 1;
      const religionRatio = this._host.game.getEffect("unicornsRatioReligion") + 1;
      const paragonRatio = this._host.game.prestige.getParagonProductionRatio() + 1;
      const faithBonus = this._host.game.religion.getSolarRevolutionRatio() + 1;
      const currentCycleIndex = this._host.game.calendar.cycle;
      const currentCycle = this._host.game.calendar.cycles[currentCycleIndex];
      let cycleBonus = 1;
      if (currentCycle.festivalEffects["unicorns"] !== void 0) {
        if (this._host.game.prestige.getPerk("numeromancy").researched && this._host.game.calendar.festivalDays) {
          cycleBonus = currentCycle.festivalEffects["unicorns"];
        }
      }
      const unicornsPerSecond = unicornsPerSecondBase * globalRatio * religionRatio * paragonRatio * faithBonus * cycleBonus;
      const ziggurathRatio = Math.max(this._host.game.bld.getBuildingExt("ziggurat").meta.on, 1);
      const baseUnicornsPerRift = 500 * (1 + this._host.game.getEffect("unicornsRatioReligion") * 0.1);
      let riftChanceRatio = 1;
      if (this._host.game.prestige.getPerk("unicornmancy").researched) {
        riftChanceRatio *= 1.1;
      }
      const unicornRiftChange = this._host.game.getEffect("riftChance") * riftChanceRatio / (1e4 * 2) * baseUnicornsPerRift;
      let bestAmortization = Infinity;
      let bestBuilding = null;
      const unicornsPerTickBase = mustExist(
        this._host.game.bld.getBuildingExt("unicornPasture").meta.effects["unicornsPerTickBase"]
      );
      const pastureProduction = unicornsPerTickBase * this._host.game.getTicksPerSecondUI() * globalRatio * religionRatio * paragonRatio * faithBonus * cycleBonus;
      const pastureAmortization = mustExist(pastureButton.model.prices)[0].val / pastureProduction;
      if (pastureAmortization < bestAmortization) {
        bestAmortization = pastureAmortization;
        bestBuilding = "unicornPasture";
      }
      for (const button of this.manager.tab.zgUpgradeButtons) {
        if (validBuildings.includes(button.id) && button.model.visible) {
          let unicornPrice = 0;
          for (const price of mustExist(button.model.prices)) {
            if (price.name === "unicorns") {
              unicornPrice += price.val;
            }
            if (price.name === "tears") {
              unicornPrice += price.val * 2500 / ziggurathRatio;
            }
          }
          const buildingInfo = mustExist(this._host.game.religion.getZU(button.id));
          let religionBonus = religionRatio;
          let riftChance = this._host.game.getEffect("riftChance");
          for (const effect in buildingInfo.effects) {
            if (effect === "unicornsRatioReligion") {
              religionBonus += mustExist(buildingInfo.effects.unicornsRatioReligion);
            }
            if (effect === "riftChance") {
              riftChance += mustExist(buildingInfo.effects.riftChance);
            }
          }
          const unicornsPerRift = 500 * ((religionBonus - 1) * 0.1 + 1);
          let riftBonus = riftChance * riftChanceRatio / (1e4 * 2) * unicornsPerRift;
          riftBonus -= unicornRiftChange;
          let buildingProduction = unicornsPerSecondBase * globalRatio * religionBonus * paragonRatio * faithBonus * cycleBonus;
          buildingProduction -= unicornsPerSecond;
          buildingProduction += riftBonus;
          const amortization = unicornPrice / buildingProduction;
          if (amortization < bestAmortization) {
            if (0 < riftBonus || religionRatio < religionBonus && 0 < unicornPrice) {
              bestAmortization = amortization;
              bestBuilding = button.id;
            }
          }
        }
      }
      return bestBuilding;
    }
    build(name, variant, amount) {
      const build = this.getBuild(name, variant);
      if (build === null) {
        throw new Error(`Unable to build '${name}'. Build information not available.`);
      }
      const button = this.getBuildButton(name, variant);
      if (!button || !button.model.enabled)
        return;
      const amountTemp = amount;
      const label = build.label;
      amount = this._bulkManager.construct(button.model, button, amount);
      if (amount !== amountTemp) {
        cwarn(`${label} Amount ordered: ${amountTemp} Amount Constructed: ${amount}`);
      }
      if (variant === UnicornItemVariant.OrderOfTheSun) {
        this._host.engine.storeForSummary(label, amount, "faith");
        if (amount === 1) {
          this._host.engine.iactivity("act.sun.discover", [label], "ks-faith");
        } else {
          this._host.engine.iactivity("act.sun.discovers", [label, amount], "ks-faith");
        }
      } else {
        this._host.engine.storeForSummary(label, amount, "build");
        if (amount === 1) {
          this._host.engine.iactivity("act.build", [label], "ks-build");
        } else {
          this._host.engine.iactivity("act.builds", [label, amount], "ks-build");
        }
      }
    }
    getBuildMetaData(builds) {
      const metaData = {};
      for (const build of Object.values(builds)) {
        const buildInfo = this.getBuild(build.building, build.variant);
        if (buildInfo === null) {
          continue;
        }
        metaData[build.building] = buildInfo;
        const buildMetaData = mustExist(metaData[build.building]);
        if (!this.getBuildButton(build.building, build.variant)) {
          buildMetaData.rHidden = true;
        } else {
          const model = mustExist(this.getBuildButton(build.building, build.variant)).model;
          const panel = build.variant === UnicornItemVariant.Cryptotheology ? this._host.game.science.get("cryptotheology").researched : true;
          buildMetaData.rHidden = !(model.visible && model.enabled && panel);
        }
      }
      return metaData;
    }
    /**
     * Retrieve information about an upgrade.
     *
     * @param name The name of the upgrade.
     * @param variant The variant of the upgrade.
     * @returns The build information for the upgrade.
     */
    getBuild(name, variant) {
      switch (variant) {
        case UnicornItemVariant.Ziggurat:
          return this._host.game.religion.getZU(name) ?? null;
        case UnicornItemVariant.OrderOfTheSun:
          return this._host.game.religion.getRU(name) ?? null;
        case UnicornItemVariant.Cryptotheology:
          return this._host.game.religion.getTU(name) ?? null;
      }
      return null;
    }
    /**
     * Find the button that allows purchasing a given upgrade.
     *
     * @param name The name of the upgrade.
     * @param variant The variant of the upgrade.
     * @returns The button to buy the upgrade, or `null`.
     */
    getBuildButton(name, variant) {
      let buttons;
      switch (variant) {
        case UnicornItemVariant.Ziggurat:
          buttons = this.manager.tab.zgUpgradeButtons;
          break;
        case UnicornItemVariant.OrderOfTheSun:
          buttons = this.manager.tab.rUpgradeButtons;
          break;
        case UnicornItemVariant.Cryptotheology:
          buttons = this.manager.tab.children[0].children[0].children;
          break;
        default:
          throw new Error(`Invalid variant '${variant}'`);
      }
      const build = this.getBuild(name, variant);
      if (build === null) {
        throw new Error(`Unable to retrieve build information for '${name}'`);
      }
      for (const button of buttons) {
        const haystack = button.model.name;
        if (haystack.indexOf(build.label) !== -1) {
          return button;
        }
      }
      return null;
    }
    _autoSacrificeUnicorns() {
      const unicorns = this._workshopManager.getResource("unicorns");
      const available = this._workshopManager.getValueAvailable("unicorns");
      if (!isNil(this._host.game.religionTab.sacrificeBtn) && this.settings.sacrificeUnicorns.trigger <= available && this.settings.sacrificeUnicorns.trigger <= unicorns.value) {
        const unicornsForSacrifice = available - this.settings.sacrificeUnicorns.trigger;
        const sacrificePercentage = unicornsForSacrifice / available;
        const percentageInverse = 1 / sacrificePercentage;
        const controller = this._host.game.religionTab.sacrificeBtn.controller;
        const model = this._host.game.religionTab.sacrificeBtn.model;
        const customController = new classes.ui.religion.TransformBtnController(
          game,
          controller.controllerOpts
        );
        const link = customController._newLink(model, percentageInverse);
        link.handler(new Event("decoy"), (success) => {
          if (!success) {
            return;
          }
          const cost = unicornsForSacrifice;
          this._host.engine.iactivity(
            "act.sacrificeUnicorns",
            [this._host.game.getDisplayValueExt(cost)],
            "ks-faith"
          );
          this._host.engine.storeForSummary(
            this._host.engine.i18n("$resources.unicorns.title"),
            1,
            "refine"
          );
        });
      }
    }
    async _autoSacrificeAlicorns() {
      var _a;
      const alicorns = this._workshopManager.getResource("alicorn");
      const available = this._workshopManager.getValueAvailable("alicorn");
      if (!isNil(this._host.game.religionTab.sacrificeAlicornsBtn) && this.settings.sacrificeAlicorns.trigger <= available && this.settings.sacrificeAlicorns.trigger <= alicorns.value) {
        const controller = this._host.game.religionTab.sacrificeAlicornsBtn.controller;
        const model = this._host.game.religionTab.sacrificeAlicornsBtn.model;
        await new Promise((resolve2) => controller.buyItem(model, new MouseEvent("click"), resolve2));
        const cost = mustExist((_a = model.prices) == null ? void 0 : _a[0]).val;
        this._host.engine.iactivity("act.sacrificeAlicorns", [cost], "ks-faith");
        this._host.engine.storeForSummary(
          this._host.engine.i18n("$resources.alicorn.title"),
          1,
          "refine"
        );
      }
    }
    async _autoTears() {
      const tears = this._workshopManager.getResource("tears");
      const available = this._workshopManager.getValueAvailable("tears");
      const sorrow = this._workshopManager.getResource("sorrow");
      if (!isNil(this._host.game.religionTab.refineBtn) && this.settings.refineTears.trigger <= available && this.settings.refineTears.trigger <= tears.value && sorrow.value < sorrow.maxValue) {
        const controller = new classes.ui.religion.RefineTearsBtnController(this._host.game);
        const model = this._host.game.religionTab.refineBtn.model;
        await new Promise((resolve2) => controller.buyItem(model, new MouseEvent("click"), resolve2));
        this._host.engine.iactivity("act.refineTears", [], "ks-faith");
        this._host.engine.storeForSummary(
          this._host.engine.i18n("$resources.tears.title"),
          1,
          "refine"
        );
      }
    }
    async _autoTCs() {
      var _a;
      const timeCrystals = this._workshopManager.getResource("timeCrystal");
      const available = this._workshopManager.getValueAvailable("timeCrystal");
      if (!isNil(this._host.game.religionTab.refineTCBtn) && this.settings.refineTimeCrystals.trigger <= available && this.settings.refineTimeCrystals.trigger <= timeCrystals.value) {
        const controller = this._host.game.religionTab.refineTCBtn.controller;
        const model = this._host.game.religionTab.refineTCBtn.model;
        await new Promise((resolve2) => controller.buyItem(model, new MouseEvent("click"), resolve2));
        const cost = mustExist((_a = model.prices) == null ? void 0 : _a[0]).val;
        this._host.engine.iactivity("act.refineTCs", [cost], "ks-faith");
        this._host.engine.storeForSummary(
          this._host.engine.i18n("$resources.timeCrystal.title"),
          cost,
          "refine"
        );
      }
    }
    _autoTAP() {
      const faith = this._workshopManager.getResource("faith");
      const faithLevel = faith.value / faith.maxValue;
      if (this.settings.transcend.enabled && this.settings.autoPraise.trigger - 0.02 <= faithLevel) {
        this._autoTranscend();
      }
      if (this.settings.autoPraise.trigger <= faithLevel) {
        if (this.settings.adore.enabled && mustExist(this._host.game.religion.getRU("apocripha")).on) {
          this._autoAdore(this.settings.adore.trigger);
        }
        if (this.settings.autoPraise.enabled) {
          this._autoPraise();
        }
      }
    }
    _autoAdore(trigger) {
      const faith = this._workshopManager.getResource("faith");
      const worship = this._host.game.religion.faith;
      const epiphany = this._host.game.religion.faithRatio;
      const transcendenceReached = mustExist(this._host.game.religion.getRU("transcendence")).on;
      const transcendenceTierCurrent = transcendenceReached ? this._host.game.religion.transcendenceTier : 0;
      const maxSolarRevolution = 10 + this._host.game.getEffect("solarRevolutionLimit");
      const triggerSolarRevolution = maxSolarRevolution * trigger;
      const epiphanyIncrease = worship / 1e6 * transcendenceTierCurrent * transcendenceTierCurrent * 1.01;
      const epiphanyAfterAdore = epiphany + epiphanyIncrease;
      const worshipAfterAdore = 0.01 + faith.value * (1 + this._host.game.getUnlimitedDR(epiphanyAfterAdore, 0.1) * 0.1);
      const solarRevolutionAfterAdore = this._host.game.getLimitedDR(
        this._host.game.getUnlimitedDR(worshipAfterAdore, 1e3) / 100,
        maxSolarRevolution
      );
      if (triggerSolarRevolution <= solarRevolutionAfterAdore) {
        this._host.game.religion._resetFaithInternal(1.01);
        this._host.engine.iactivity(
          "act.adore",
          [
            this._host.game.getDisplayValueExt(worship),
            this._host.game.getDisplayValueExt(epiphanyIncrease)
          ],
          "ks-adore"
        );
        this._host.engine.storeForSummary("adore", epiphanyIncrease);
      }
    }
    _autoTranscend() {
      let epiphany = this._host.game.religion.faithRatio;
      const transcendenceReached = mustExist(this._host.game.religion.getRU("transcendence")).on;
      let transcendenceTierCurrent = transcendenceReached ? this._host.game.religion.transcendenceTier : 0;
      if (transcendenceReached) {
        const adoreIncreaseRatio = Math.pow(
          (transcendenceTierCurrent + 2) / (transcendenceTierCurrent + 1),
          2
        );
        const needNextLevel = this._host.game.religion._getTranscendTotalPrice(transcendenceTierCurrent + 1) - this._host.game.religion._getTranscendTotalPrice(transcendenceTierCurrent);
        const x = needNextLevel;
        const k = adoreIncreaseRatio;
        const epiphanyRecommend = (1 - k + Math.sqrt(80 * (k * k - 1) * x + (k - 1) * (k - 1))) * k / (40 * (k + 1) * (k + 1) * (k - 1)) + x + x / (k * k - 1);
        if (epiphanyRecommend <= epiphany) {
          this._host.game.religion.faithRatio -= needNextLevel;
          this._host.game.religion.tcratio += needNextLevel;
          this._host.game.religion.transcendenceTier += 1;
          const atheism = mustExist(this._host.game.challenges.getChallenge("atheism"));
          atheism.calculateEffects(atheism, this._host.game);
          const blackObelisk = mustExist(this._host.game.religion.getTU("blackObelisk"));
          blackObelisk.calculateEffects(blackObelisk, this._host.game);
          this._host.game.msg(
            this._host.engine.i18n("$religion.transcend.msg.success", [
              this._host.game.religion.transcendenceTier
            ])
          );
          epiphany = this._host.game.religion.faithRatio;
          transcendenceTierCurrent = this._host.game.religion.transcendenceTier;
          this._host.engine.iactivity(
            "act.transcend",
            [this._host.game.getDisplayValueExt(needNextLevel), transcendenceTierCurrent],
            "ks-transcend"
          );
          this._host.engine.storeForSummary("transcend", 1);
        }
      }
    }
    _autoPraise() {
      const faith = this._workshopManager.getResource("faith");
      let apocryphaBonus;
      if (!this._host.game.religion.getFaithBonus) {
        apocryphaBonus = this._host.game.religion.getApocryphaBonus();
      } else {
        apocryphaBonus = this._host.game.religion.getFaithBonus();
      }
      const worshipIncrease = faith.value * (1 + apocryphaBonus);
      this._host.engine.storeForSummary("praise", worshipIncrease);
      this._host.engine.iactivity(
        "act.praise",
        [
          this._host.game.getDisplayValueExt(faith.value),
          this._host.game.getDisplayValueExt(worshipIncrease)
        ],
        "ks-praise"
      );
      this._host.game.religion.praise();
    }
  }
  class UpgradeManager {
    constructor(host) {
      __publicField(this, "_host");
      this._host = host;
    }
    async upgrade(upgrade, variant) {
      const button = this.getUpgradeButton(upgrade, variant);
      if (!button || !button.model.enabled) {
        return false;
      }
      const controller = variant === "policy" ? new classes.ui.PolicyBtnController(this._host.game) : new com.nuclearunicorn.game.ui.TechButtonController(this._host.game);
      this._host.game.opts.noConfirm = true;
      const success = await UpgradeManager.skipConfirm(
        () => new Promise((resolve2) => controller.buyItem(button.model, new MouseEvent("click"), resolve2))
      );
      if (!success) {
        return false;
      }
      const label = upgrade.label;
      if (variant === "workshop") {
        this._host.engine.storeForSummary(label, 1, "upgrade");
        this._host.engine.iactivity("upgrade.upgrade", [label], "ks-upgrade");
      } else if (variant === "policy") {
        this._host.engine.iactivity("upgrade.policy", [label]);
      } else if (variant === "science") {
        this._host.engine.storeForSummary(label, 1, "research");
        this._host.engine.iactivity("upgrade.tech", [label], "ks-research");
      }
      return true;
    }
    /**
     * Run a piece of code that might invoke UI confirmation and
     * skip that UI confirmation.
     *
     * @param action The function to run without UI confirmation.
     * @returns Whatever `action` returns.
     */
    static async skipConfirm(action) {
      const originalConfirm = game.ui.confirm;
      try {
        game.ui.confirm = () => true;
        return await action();
      } finally {
        game.ui.confirm = originalConfirm;
      }
    }
    getUpgradeButton(upgrade, variant) {
      let buttons;
      if (variant === "workshop") {
        buttons = this.manager.tab.buttons;
      } else if (variant === "policy") {
        buttons = this.manager.tab.policyPanel.children;
      } else if (variant === "science") {
        buttons = this.manager.tab.buttons;
      }
      for (const button of mustExist(buttons)) {
        if (button.model.name === upgrade.label) {
          return button;
        }
      }
      return null;
    }
  }
  const difference = (a, b) => {
    return a.filter((x) => !b.includes(x));
  };
  class PolicySetting extends Setting {
    constructor(policy, enabled = false) {
      super(enabled);
      __privateAdd(this, _policy, void 0);
      __privateSet(this, _policy, policy);
    }
    get policy() {
      return __privateGet(this, _policy);
    }
  }
  _policy = new WeakMap();
  class PolicySettings extends Setting {
    constructor(enabled = false, policies = {
      authocracy: new PolicySetting("authocracy", false),
      bigStickPolicy: new PolicySetting("bigStickPolicy", false),
      carnivale: new PolicySetting("carnivale", false),
      cityOnAHill: new PolicySetting("cityOnAHill", false),
      clearCutting: new PolicySetting("clearCutting", false),
      communism: new PolicySetting("communism", false),
      conservation: new PolicySetting("conservation", false),
      culturalExchange: new PolicySetting("culturalExchange", false),
      diplomacy: new PolicySetting("diplomacy", false),
      environmentalism: new PolicySetting("environmentalism", false),
      epicurianism: new PolicySetting("epicurianism", false),
      expansionism: new PolicySetting("expansionism", false),
      extravagance: new PolicySetting("extravagance", false),
      fascism: new PolicySetting("fascism", false),
      frugality: new PolicySetting("frugality", false),
      fullIndustrialization: new PolicySetting("fullIndustrialization", false),
      isolationism: new PolicySetting("isolationism", false),
      knowledgeSharing: new PolicySetting("knowledgeSharing", false),
      liberalism: new PolicySetting("liberalism", false),
      liberty: new PolicySetting("liberty", false),
      militarizeSpace: new PolicySetting("militarizeSpace", false),
      monarchy: new PolicySetting("monarchy", false),
      mysticism: new PolicySetting("mysticism", false),
      necrocracy: new PolicySetting("necrocracy", false),
      openWoodlands: new PolicySetting("openWoodlands", false),
      outerSpaceTreaty: new PolicySetting("outerSpaceTreaty", false),
      radicalXenophobia: new PolicySetting("radicalXenophobia", false),
      rationality: new PolicySetting("rationality", false),
      rationing: new PolicySetting("rationing", false),
      republic: new PolicySetting("republic", false),
      socialism: new PolicySetting("socialism", false),
      stoicism: new PolicySetting("stoicism", false),
      stripMining: new PolicySetting("stripMining", false),
      sustainability: new PolicySetting("sustainability", false),
      technocracy: new PolicySetting("technocracy", false),
      theocracy: new PolicySetting("theocracy", false),
      tradition: new PolicySetting("tradition", false),
      transkittenism: new PolicySetting("transkittenism", false),
      zebraRelationsAppeasement: new PolicySetting("zebraRelationsAppeasement", false),
      zebraRelationsBellicosity: new PolicySetting("zebraRelationsBellicosity", false)
    }) {
      super(enabled);
      __publicField(this, "policies");
      this.policies = policies;
    }
    static validateGame(game2, settings) {
      const inSettings = Object.keys(settings.policies);
      const inGame = game2.science.policies.map((policy) => policy.name);
      const missingInSettings = difference(inGame, inSettings);
      const redundantInSettings = difference(inSettings, inGame);
      for (const policy of missingInSettings) {
        cwarn(`The policy '${policy}' is not tracked in Kitten Scientists!`);
      }
      for (const policy of redundantInSettings) {
        cwarn(`The policy '${policy}' is not a policy in Kittens Game!`);
      }
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.policies, settings.policies, (policy, item) => {
        policy.enabled = (item == null ? void 0 : item.enabled) ?? policy.enabled;
      });
    }
  }
  class TechSetting extends Setting {
    constructor(tech, enabled = false) {
      super(enabled);
      __privateAdd(this, _tech, void 0);
      __privateSet(this, _tech, tech);
    }
    get tech() {
      return __privateGet(this, _tech);
    }
  }
  _tech = new WeakMap();
  class TechSettings extends Setting {
    constructor(enabled = false, techs = {
      acoustics: new TechSetting("acoustics", true),
      advExogeology: new TechSetting("advExogeology", true),
      agriculture: new TechSetting("agriculture", true),
      ai: new TechSetting("ai", true),
      animal: new TechSetting("animal", true),
      antimatter: new TechSetting("antimatter", true),
      archeology: new TechSetting("archeology", true),
      archery: new TechSetting("archery", true),
      architecture: new TechSetting("architecture", true),
      artificialGravity: new TechSetting("artificialGravity", true),
      astronomy: new TechSetting("astronomy", true),
      biochemistry: new TechSetting("biochemistry", true),
      biology: new TechSetting("biology", true),
      blackchain: new TechSetting("blackchain", true),
      brewery: new TechSetting("brewery", true),
      calendar: new TechSetting("calendar", true),
      chemistry: new TechSetting("chemistry", true),
      chronophysics: new TechSetting("chronophysics", true),
      civil: new TechSetting("civil", true),
      combustion: new TechSetting("combustion", true),
      construction: new TechSetting("construction", true),
      cryptotheology: new TechSetting("cryptotheology", true),
      currency: new TechSetting("currency", true),
      dimensionalPhysics: new TechSetting("dimensionalPhysics", true),
      drama: new TechSetting("drama", true),
      ecology: new TechSetting("ecology", true),
      electricity: new TechSetting("electricity", true),
      electronics: new TechSetting("electronics", true),
      engineering: new TechSetting("engineering", true),
      exogeology: new TechSetting("exogeology", true),
      exogeophysics: new TechSetting("exogeophysics", true),
      genetics: new TechSetting("genetics", true),
      hydroponics: new TechSetting("hydroponics", true),
      industrialization: new TechSetting("industrialization", true),
      machinery: new TechSetting("machinery", true),
      math: new TechSetting("math", true),
      mechanization: new TechSetting("mechanization", true),
      metal: new TechSetting("metal", true),
      metalurgy: new TechSetting("metalurgy", true),
      metaphysics: new TechSetting("metaphysics", true),
      mining: new TechSetting("mining", true),
      nanotechnology: new TechSetting("nanotechnology", true),
      navigation: new TechSetting("navigation", true),
      nuclearFission: new TechSetting("nuclearFission", true),
      oilProcessing: new TechSetting("oilProcessing", true),
      orbitalEngineering: new TechSetting("orbitalEngineering", true),
      paradoxalKnowledge: new TechSetting("paradoxalKnowledge", true),
      particlePhysics: new TechSetting("particlePhysics", true),
      philosophy: new TechSetting("philosophy", true),
      physics: new TechSetting("physics", true),
      quantumCryptography: new TechSetting("quantumCryptography", true),
      robotics: new TechSetting("robotics", true),
      rocketry: new TechSetting("rocketry", true),
      sattelites: new TechSetting("sattelites", true),
      steel: new TechSetting("steel", true),
      superconductors: new TechSetting("superconductors", true),
      tachyonTheory: new TechSetting("tachyonTheory", true),
      terraformation: new TechSetting("terraformation", true),
      theology: new TechSetting("theology", true),
      thorium: new TechSetting("thorium", true),
      voidSpace: new TechSetting("voidSpace", true),
      writing: new TechSetting("writing", true)
    }) {
      super(enabled);
      __publicField(this, "techs");
      this.techs = techs;
    }
    static validateGame(game2, settings) {
      const inSettings = Object.keys(settings.techs);
      const inGame = game2.science.techs.map((tech) => tech.name);
      const missingInSettings = difference(inGame, inSettings);
      const redundantInSettings = difference(inSettings, inGame);
      for (const tech of missingInSettings) {
        cwarn(`The technology '${tech}' is not tracked in Kitten Scientists!`);
      }
      for (const tech of redundantInSettings) {
        cwarn(`The technology '${tech}' is not a technology in Kittens Game!`);
      }
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.techs, settings.techs, (tech, item) => {
        tech.enabled = (item == null ? void 0 : item.enabled) ?? tech.enabled;
      });
    }
  }
  class ScienceSettings extends Setting {
    constructor(enabled = false, policies = new PolicySettings(), techs = new TechSettings(), observe = new Setting(true)) {
      super(enabled);
      __publicField(this, "policies");
      __publicField(this, "techs");
      __publicField(this, "observe");
      this.policies = policies;
      this.techs = techs;
      this.observe = observe;
    }
    static validateGame(game2, settings) {
      PolicySettings.validateGame(game2, settings.policies);
      TechSettings.validateGame(game2, settings.techs);
    }
    load(settings) {
      var _a;
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      this.policies.load(settings.policies);
      this.techs.load(settings.techs);
      this.observe.enabled = ((_a = settings.observe) == null ? void 0 : _a.enabled) ?? this.observe.enabled;
    }
  }
  class ScienceManager extends UpgradeManager {
    constructor(host, workshopManager, settings = new ScienceSettings()) {
      super(host);
      __publicField(this, "manager");
      __publicField(this, "settings");
      __publicField(this, "_workshopManager");
      this.settings = settings;
      this.manager = new TabManager(this._host, "Science");
      this._workshopManager = workshopManager;
    }
    async tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      if (this.settings.techs.enabled && this._host.game.tabs[2].visible) {
        await this.autoUnlock();
      }
      if (this.settings.policies.enabled && this._host.game.tabs[2].visible) {
        await this.autoPolicy();
      }
      if (this.settings.observe.enabled) {
        this.observeStars();
      }
    }
    async autoUnlock() {
      this.manager.render();
      const techs = this._host.game.science.techs;
      const toUnlock = new Array();
      workLoop:
        for (const setting of Object.values(this.settings.techs.techs)) {
          if (!setting.enabled) {
            continue;
          }
          const tech = techs.find((subject) => subject.name === setting.tech);
          if (isNil(tech)) {
            cerror(`Tech '${setting.tech}' not found in game!`);
            continue;
          }
          if (tech.researched || !tech.unlocked) {
            continue;
          }
          let prices = UserScript.window.dojo.clone(tech.prices);
          prices = this._host.game.village.getEffectLeader("scientist", prices);
          for (const resource of prices) {
            if (this._workshopManager.getValueAvailable(resource.name) < resource.val) {
              continue workLoop;
            }
          }
          toUnlock.push(tech);
        }
      for (const item of toUnlock) {
        await this.upgrade(item, "science");
      }
    }
    async autoPolicy() {
      this.manager.render();
      const policies = this._host.game.science.policies;
      const toUnlock = new Array();
      for (const setting of Object.values(this.settings.policies.policies)) {
        if (!setting.enabled) {
          continue;
        }
        const targetPolicy = policies.find((subject) => subject.name === setting.policy);
        if (isNil(targetPolicy)) {
          cerror(`Policy '${setting.policy}' not found in game!`);
          continue;
        }
        if (!targetPolicy.researched && !targetPolicy.blocked && targetPolicy.unlocked) {
          if (targetPolicy.requiredLeaderJob === void 0 || this._host.game.village.leader !== null && this._host.game.village.leader.job === targetPolicy.requiredLeaderJob) {
            toUnlock.push(targetPolicy);
          }
        }
      }
      for (const item of toUnlock) {
        await this.upgrade(item, "policy");
      }
    }
    /**
     * If there is currently an astronomical event, observe it.
     */
    observeStars() {
      if (this._host.game.calendar.observeBtn !== null) {
        this._host.game.calendar.observeHandler();
        this._host.engine.iactivity("act.observe", [], "ks-star");
        this._host.engine.storeForSummary("stars", 1);
      }
    }
  }
  class LogFilterSettingsItem extends Setting {
    constructor(variant) {
      super(true);
      __privateAdd(this, _variant2, void 0);
      __privateSet(this, _variant2, variant);
    }
    get variant() {
      return __privateGet(this, _variant2);
    }
  }
  _variant2 = new WeakMap();
  class LogFilterSettings extends Setting {
    constructor(enabled = false, filters = {
      build: new LogFilterSettingsItem(
        "ks-activity type_ks-build"
        /* Build */
      ),
      craft: new LogFilterSettingsItem(
        "ks-activity type_ks-craft"
        /* Craft */
      ),
      upgrade: new LogFilterSettingsItem(
        "ks-activity type_ks-upgrade"
        /* Upgrade */
      ),
      research: new LogFilterSettingsItem(
        "ks-activity type_ks-research"
        /* Research */
      ),
      trade: new LogFilterSettingsItem(
        "ks-activity type_ks-trade"
        /* Trade */
      ),
      hunt: new LogFilterSettingsItem(
        "ks-activity type_ks-hunt"
        /* Hunt */
      ),
      praise: new LogFilterSettingsItem(
        "ks-activity type_ks-praise"
        /* Praise */
      ),
      adore: new LogFilterSettingsItem(
        "ks-activity type_ks-adore"
        /* Adore */
      ),
      transcend: new LogFilterSettingsItem(
        "ks-activity type_ks-transcend"
        /* Transcend */
      ),
      faith: new LogFilterSettingsItem(
        "ks-activity type_ks-faith"
        /* Faith */
      ),
      accelerate: new LogFilterSettingsItem(
        "ks-activity type_ks-accelerate"
        /* Accelerate */
      ),
      timeSkip: new LogFilterSettingsItem(
        "ks-activity type_ks-timeSkip"
        /* TimeSkip */
      ),
      festival: new LogFilterSettingsItem(
        "ks-activity type_ks-festival"
        /* Festival */
      ),
      star: new LogFilterSettingsItem(
        "ks-activity type_ks-star"
        /* Star */
      ),
      distribute: new LogFilterSettingsItem(
        "ks-activity type_ks-distribute"
        /* Distribute */
      ),
      promote: new LogFilterSettingsItem(
        "ks-activity type_ks-promote"
        /* Promote */
      ),
      misc: new LogFilterSettingsItem(
        "ks-activity"
        /* Misc */
      )
    }, disableKGLog = new Setting(false)) {
      super(enabled);
      __publicField(this, "filters");
      __publicField(this, "disableKGLog");
      this.filters = filters;
      this.disableKGLog = disableKGLog;
    }
    load(settings) {
      var _a;
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.filters, settings.filters, (filter, item) => {
        filter.enabled = (item == null ? void 0 : item.enabled) ?? filter.enabled;
      });
      this.disableKGLog.enabled = ((_a = settings.disableKGLog) == null ? void 0 : _a.enabled) ?? this.disableKGLog.enabled;
    }
  }
  class UpgradeSetting extends Setting {
    constructor(upgrade, enabled = false) {
      super(enabled);
      __privateAdd(this, _upgrade2, void 0);
      __privateSet(this, _upgrade2, upgrade);
    }
    get upgrade() {
      return __privateGet(this, _upgrade2);
    }
  }
  _upgrade2 = new WeakMap();
  class UpgradeSettings extends Setting {
    constructor(enabled = false, upgrades = {
      advancedAutomation: new UpgradeSetting("advancedAutomation", true),
      advancedRefinement: new UpgradeSetting("advancedRefinement", true),
      aiBases: new UpgradeSetting("aiBases", true),
      aiEngineers: new UpgradeSetting("aiEngineers", true),
      alloyArmor: new UpgradeSetting("alloyArmor", true),
      alloyAxe: new UpgradeSetting("alloyAxe", true),
      alloyBarns: new UpgradeSetting("alloyBarns", true),
      alloySaw: new UpgradeSetting("alloySaw", true),
      alloyWarehouses: new UpgradeSetting("alloyWarehouses", true),
      amBases: new UpgradeSetting("amBases", true),
      amDrive: new UpgradeSetting("amDrive", true),
      amFission: new UpgradeSetting("amFission", true),
      amReactors: new UpgradeSetting("amReactors", true),
      amReactorsMK2: new UpgradeSetting("amReactorsMK2", true),
      assistance: new UpgradeSetting("assistance", true),
      astrolabe: new UpgradeSetting("astrolabe", true),
      astrophysicists: new UpgradeSetting("astrophysicists", true),
      augumentation: new UpgradeSetting("augumentation", true),
      automatedPlants: new UpgradeSetting("automatedPlants", true),
      barges: new UpgradeSetting("barges", true),
      biofuel: new UpgradeSetting("biofuel", true),
      bolas: new UpgradeSetting("bolas", true),
      cadSystems: new UpgradeSetting("cadSystems", true),
      caravanserai: new UpgradeSetting("caravanserai", true),
      carbonSequestration: new UpgradeSetting("carbonSequestration", true),
      cargoShips: new UpgradeSetting("cargoShips", true),
      celestialMechanics: new UpgradeSetting("celestialMechanics", true),
      chronoEngineers: new UpgradeSetting("chronoEngineers", true),
      chronoforge: new UpgradeSetting("chronoforge", true),
      coalFurnace: new UpgradeSetting("coalFurnace", true),
      coldFusion: new UpgradeSetting("coldFusion", true),
      combustionEngine: new UpgradeSetting("combustionEngine", true),
      compositeBow: new UpgradeSetting("compositeBow", true),
      concreteBarns: new UpgradeSetting("concreteBarns", true),
      concreteHuts: new UpgradeSetting("concreteHuts", true),
      concreteWarehouses: new UpgradeSetting("concreteWarehouses", true),
      crossbow: new UpgradeSetting("crossbow", true),
      cryocomputing: new UpgradeSetting("cryocomputing", true),
      darkEnergy: new UpgradeSetting("darkEnergy", true),
      deepMining: new UpgradeSetting("deepMining", true),
      distorsion: new UpgradeSetting("distorsion", true),
      electrolyticSmelting: new UpgradeSetting("electrolyticSmelting", true),
      eludiumCracker: new UpgradeSetting("eludiumCracker", true),
      eludiumHuts: new UpgradeSetting("eludiumHuts", true),
      eludiumReflectors: new UpgradeSetting("eludiumReflectors", true),
      energyRifts: new UpgradeSetting("energyRifts", true),
      enrichedThorium: new UpgradeSetting("enrichedThorium", true),
      enrichedUranium: new UpgradeSetting("enrichedUranium", true),
      factoryAutomation: new UpgradeSetting("factoryAutomation", true),
      factoryLogistics: new UpgradeSetting("factoryLogistics", true),
      factoryOptimization: new UpgradeSetting("factoryOptimization", true),
      factoryProcessing: new UpgradeSetting("factoryProcessing", true),
      factoryRobotics: new UpgradeSetting("factoryRobotics", true),
      fluidizedReactors: new UpgradeSetting("fluidizedReactors", true),
      fluxCondensator: new UpgradeSetting("fluxCondensator", true),
      fuelInjectors: new UpgradeSetting("fuelInjectors", true),
      geodesy: new UpgradeSetting("geodesy", true),
      gmo: new UpgradeSetting("gmo", true),
      goldOre: new UpgradeSetting("goldOre", true),
      hubbleTelescope: new UpgradeSetting("hubbleTelescope", true),
      huntingArmor: new UpgradeSetting("huntingArmor", true),
      hydroPlantTurbines: new UpgradeSetting("hydroPlantTurbines", true),
      internet: new UpgradeSetting("internet", true),
      invisibleBlackHand: new UpgradeSetting("invisibleBlackHand", true),
      ironAxes: new UpgradeSetting("ironAxes", true),
      ironHoes: new UpgradeSetting("ironHoes", true),
      ironwood: new UpgradeSetting("ironwood", true),
      lhc: new UpgradeSetting("lhc", true),
      logistics: new UpgradeSetting("logistics", true),
      longRangeSpaceships: new UpgradeSetting("longRangeSpaceships", true),
      machineLearning: new UpgradeSetting("machineLearning", true),
      mineralAxes: new UpgradeSetting("mineralAxes", true),
      mineralHoes: new UpgradeSetting("mineralHoes", true),
      miningDrill: new UpgradeSetting("miningDrill", true),
      mWReactor: new UpgradeSetting("mWReactor", true),
      nanosuits: new UpgradeSetting("nanosuits", true),
      neuralNetworks: new UpgradeSetting("neuralNetworks", true),
      nuclearPlants: new UpgradeSetting("nuclearPlants", true),
      nuclearSmelters: new UpgradeSetting("nuclearSmelters", true),
      offsetPress: new UpgradeSetting("offsetPress", true),
      oilDistillation: new UpgradeSetting("oilDistillation", true),
      oilRefinery: new UpgradeSetting("oilRefinery", true),
      orbitalGeodesy: new UpgradeSetting("orbitalGeodesy", true),
      oxidation: new UpgradeSetting("oxidation", true),
      photolithography: new UpgradeSetting("photolithography", true),
      photovoltaic: new UpgradeSetting("photovoltaic", true),
      pneumaticPress: new UpgradeSetting("pneumaticPress", true),
      printingPress: new UpgradeSetting("printingPress", true),
      pumpjack: new UpgradeSetting("pumpjack", true),
      pyrolysis: new UpgradeSetting("pyrolysis", true),
      qdot: new UpgradeSetting("qdot", true),
      railgun: new UpgradeSetting("railgun", true),
      reactorVessel: new UpgradeSetting("reactorVessel", true),
      refrigeration: new UpgradeSetting("refrigeration", true),
      register: new UpgradeSetting("register", true),
      reinforcedBarns: new UpgradeSetting("reinforcedBarns", true),
      reinforcedSaw: new UpgradeSetting("reinforcedSaw", true),
      reinforcedWarehouses: new UpgradeSetting("reinforcedWarehouses", true),
      relicStation: new UpgradeSetting("relicStation", true),
      rotaryKiln: new UpgradeSetting("rotaryKiln", true),
      satelliteRadio: new UpgradeSetting("satelliteRadio", true),
      satnav: new UpgradeSetting("satnav", true),
      seti: new UpgradeSetting("seti", true),
      silos: new UpgradeSetting("silos", true),
      solarSatellites: new UpgradeSetting("solarSatellites", true),
      spaceEngineers: new UpgradeSetting("spaceEngineers", true),
      spaceManufacturing: new UpgradeSetting("spaceManufacturing", true),
      spiceNavigation: new UpgradeSetting("spiceNavigation", true),
      starlink: new UpgradeSetting("starlink", true),
      stasisChambers: new UpgradeSetting("stasisChambers", true),
      steelArmor: new UpgradeSetting("steelArmor", true),
      steelAxe: new UpgradeSetting("steelAxe", true),
      steelPlants: new UpgradeSetting("steelPlants", true),
      steelSaw: new UpgradeSetting("steelSaw", true),
      stoneBarns: new UpgradeSetting("stoneBarns", true),
      storageBunkers: new UpgradeSetting("storageBunkers", true),
      strenghtenBuild: new UpgradeSetting("strenghtenBuild", true),
      tachyonAccelerators: new UpgradeSetting("tachyonAccelerators", true),
      thinFilm: new UpgradeSetting("thinFilm", true),
      thoriumEngine: new UpgradeSetting("thoriumEngine", true),
      thoriumReactors: new UpgradeSetting("thoriumReactors", true),
      titaniumAxe: new UpgradeSetting("titaniumAxe", true),
      titaniumBarns: new UpgradeSetting("titaniumBarns", true),
      titaniumMirrors: new UpgradeSetting("titaniumMirrors", true),
      titaniumSaw: new UpgradeSetting("titaniumSaw", true),
      titaniumWarehouses: new UpgradeSetting("titaniumWarehouses", true),
      turnSmoothly: new UpgradeSetting("turnSmoothly", true),
      unicornSelection: new UpgradeSetting("unicornSelection", true),
      unobtainiumAxe: new UpgradeSetting("unobtainiumAxe", true),
      unobtainiumDrill: new UpgradeSetting("unobtainiumDrill", true),
      unobtainiumHuts: new UpgradeSetting("unobtainiumHuts", true),
      unobtainiumReflectors: new UpgradeSetting("unobtainiumReflectors", true),
      unobtainiumSaw: new UpgradeSetting("unobtainiumSaw", true),
      uplink: new UpgradeSetting("uplink", true),
      voidAspiration: new UpgradeSetting("voidAspiration", true),
      voidEnergy: new UpgradeSetting("voidEnergy", true),
      voidReactors: new UpgradeSetting("voidReactors", true)
    }) {
      super(enabled);
      __publicField(this, "upgrades");
      this.upgrades = upgrades;
    }
    static validateGame(game2, settings) {
      const inSettings = Object.keys(settings.upgrades);
      const inGame = game2.workshop.upgrades.map((upgrade) => upgrade.name);
      const missingInSettings = difference(inGame, inSettings);
      const redundantInSettings = difference(inSettings, inGame);
      for (const upgrade of missingInSettings) {
        cwarn(`The workshop upgrade '${upgrade}' is not tracked in Kitten Scientists!`);
      }
      for (const upgrade of redundantInSettings) {
        cwarn(`The workshop upgrade '${upgrade}' is not an upgrade in Kittens Game!`);
      }
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.upgrades, settings.upgrades, (upgrade, item) => {
        upgrade.enabled = (item == null ? void 0 : item.enabled) ?? upgrade.enabled;
      });
    }
  }
  class CraftSettingsItem extends SettingLimitedMax {
    constructor(resource, enabled = true, limited = true) {
      super(enabled, limited);
      __privateAdd(this, _resource, void 0);
      __privateSet(this, _resource, resource);
    }
    get resource() {
      return __privateGet(this, _resource);
    }
  }
  _resource = new WeakMap();
  class WorkshopSettings extends SettingTrigger {
    constructor(enabled = false, trigger = 0.95, resources = {
      alloy: new CraftSettingsItem("alloy"),
      beam: new CraftSettingsItem("beam"),
      blueprint: new CraftSettingsItem("blueprint"),
      compedium: new CraftSettingsItem("compedium"),
      concrate: new CraftSettingsItem("concrate"),
      eludium: new CraftSettingsItem("eludium"),
      gear: new CraftSettingsItem("gear"),
      kerosene: new CraftSettingsItem("kerosene"),
      manuscript: new CraftSettingsItem("manuscript"),
      megalith: new CraftSettingsItem("megalith"),
      parchment: new CraftSettingsItem("parchment", true, false),
      plate: new CraftSettingsItem("plate"),
      scaffold: new CraftSettingsItem("scaffold"),
      ship: new CraftSettingsItem("ship"),
      slab: new CraftSettingsItem("slab"),
      steel: new CraftSettingsItem("steel"),
      tanker: new CraftSettingsItem("tanker"),
      thorium: new CraftSettingsItem("thorium"),
      wood: new CraftSettingsItem("wood")
    }, unlockUpgrades = new UpgradeSettings(), shipOverride = new Setting(true)) {
      super(enabled, trigger);
      __publicField(this, "resources");
      __publicField(this, "shipOverride");
      __publicField(this, "unlockUpgrades");
      this.resources = resources;
      this.shipOverride = shipOverride;
      this.unlockUpgrades = unlockUpgrades;
    }
    static validateGame(game2, settings) {
      UpgradeSettings.validateGame(game2, settings.unlockUpgrades);
    }
    load(settings) {
      var _a;
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.resources, settings.resources, (resource, item) => {
        resource.enabled = (item == null ? void 0 : item.enabled) ?? resource.enabled;
        resource.limited = (item == null ? void 0 : item.limited) ?? resource.limited;
        resource.max = (item == null ? void 0 : item.max) ?? resource.max;
      });
      this.unlockUpgrades.load(settings.unlockUpgrades);
      this.shipOverride.enabled = ((_a = settings.shipOverride) == null ? void 0 : _a.enabled) ?? this.shipOverride.enabled;
    }
  }
  class WorkshopManager extends UpgradeManager {
    constructor(host, settings = new WorkshopSettings()) {
      super(host);
      __publicField(this, "settings");
      __publicField(this, "manager");
      this.settings = settings;
      this.manager = new TabManager(this._host, "Workshop");
    }
    tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      this.autoCraft();
      this.refreshStock();
      if (this.settings.unlockUpgrades.enabled) {
        return this.autoUnlock();
      }
    }
    async autoUnlock() {
      if (!this._host.game.tabs[3].visible) {
        return;
      }
      this.manager.render();
      const upgrades = this._host.game.workshop.upgrades;
      const toUnlock = new Array();
      workLoop:
        for (const setting of Object.values(this.settings.unlockUpgrades.upgrades)) {
          if (!setting.enabled) {
            continue;
          }
          const upgrade = upgrades.find((subject) => subject.name === setting.upgrade);
          if (isNil(upgrade)) {
            cerror(`Upgrade '${setting.upgrade}' not found in game!`);
            continue;
          }
          if (upgrade.researched || !upgrade.unlocked) {
            continue;
          }
          let prices = UserScript.window.dojo.clone(upgrade.prices);
          prices = this._host.game.village.getEffectLeader("scientist", prices);
          for (const resource of prices) {
            if (this.getValueAvailable(resource.name) < resource.val) {
              continue workLoop;
            }
          }
          toUnlock.push(upgrade);
          await this.upgrade(upgrade, "workshop");
        }
      for (const item of toUnlock) {
        await this.upgrade(item, "workshop");
      }
    }
    /**
     * Try to craft as many of the passed resources as possible.
     * Usually, this is called at each iteration of the automation engine to
     * handle the crafting of items on the Workshop tab.
     *
     * @param crafts The resources to build.
     */
    autoCraft(crafts = this.settings.resources) {
      const craftRequests = /* @__PURE__ */ new Map();
      for (const craft of Object.values(crafts)) {
        if (!craft.enabled) {
          continue;
        }
        const current = !craft.max ? false : this.getResource(craft.resource);
        const max = craft.max === -1 ? Number.POSITIVE_INFINITY : craft.max;
        if (current && max < current.value) {
          continue;
        }
        if (!this.singleCraftPossible(craft.resource)) {
          continue;
        }
        const materials = Object.keys(this.getMaterials(craft.resource));
        const requiredMaterials = materials.map((material) => this.getResource(material)).filter((material) => 0 < material.maxValue);
        const allMaterialsAboveTrigger = requiredMaterials.filter(
          (material) => material.value / material.maxValue < this.settings.trigger
        ).length === 0;
        if (!allMaterialsAboveTrigger) {
          continue;
        }
        craftRequests.set(craft, {
          countRequested: 1,
          materials: materials.map((material) => ({
            resource: material,
            consume: 0
          }))
        });
      }
      if (craftRequests.size < 1) {
        return;
      }
      const billOfMaterials = /* @__PURE__ */ new Map();
      for (const [craft, request] of craftRequests) {
        for (const material of request.materials) {
          if (!billOfMaterials.has(material.resource)) {
            billOfMaterials.set(material.resource, new Array());
          }
          const consumers = mustExist(billOfMaterials.get(material.resource));
          consumers.push(craft.resource);
        }
      }
      for (const [, request] of craftRequests) {
        for (const material of request.materials) {
          const available = this.getValueAvailable(material.resource);
          material.consume = available / mustExist(billOfMaterials.get(material.resource)).length;
        }
      }
      for (const [craft, request] of craftRequests) {
        const materials = this.getMaterials(craft.resource);
        let amount = Number.MAX_VALUE;
        for (const material of request.materials) {
          const materialAmount = mustExist(materials[material.resource]);
          const materialResource = this.getResource(material.resource);
          const materialCraft = material.resource in this.settings.resources ? this.settings.resources[material.resource] : void 0;
          if (
            // For unlimited crafts, assign all resources.
            !craft.limited || // For materials that have a resource cap, also assign all resources.
            // It makes no sense to apply source material balancing here. If we did, we'd stop
            // crafting resources when the source material becomes capped. We would never be able
            // to get enough source stock so the balancing would allow for more crafts.
            0 < materialResource.maxValue || // For materials that are also crafted, if they have already been crafted to their `max`,
            // treat them the same as capped source materials, to avoid the same conflict.
            (!isNil(materialCraft) && -1 < materialCraft.max ? materialCraft.max - materialResource.value < 1 : false) || // Handle the ship override.
            craft.resource === "ship" && this.settings.shipOverride.enabled && this.getResource("ship").value < 243
          ) {
            amount = Math.min(amount, material.consume / materialAmount);
            continue;
          }
          const ratio = this._host.game.getResCraftRatio(craft.resource);
          const availableSource = this.getValueAvailable(material.resource) / mustExist(billOfMaterials.get(material.resource)).length;
          const availableTarget = this.getValueAvailable(craft.resource);
          const recipeRequires = materialAmount;
          const recipeProduces = 1 + ratio;
          const craftsPossible = availableSource / recipeRequires;
          const craftsDone = availableTarget / recipeProduces;
          amount = Math.min(amount, craftsPossible - craftsDone, material.consume / materialAmount);
        }
        request.countRequested = Math.max(0, amount);
      }
      for (const [craft, request] of craftRequests) {
        if (request.countRequested < 1) {
          continue;
        }
        this.craft(craft.resource, request.countRequested);
      }
    }
    /**
     * Craft a certain amount of items.
     *
     * @param name The resource to craft.
     * @param amount How many items of the resource to craft.
     */
    craft(name, amount) {
      amount = Math.floor(amount);
      if (!name || amount < 1) {
        return;
      }
      if (!this._canCraft(name, amount)) {
        return;
      }
      const craft = this.getCraft(name);
      const ratio = this._host.game.getResCraftRatio(craft.name);
      this._host.game.craft(craft.name, amount);
      const resourceName = mustExist(this._host.game.resPool.get(name)).title;
      amount = parseFloat((amount * (1 + ratio)).toFixed(2));
      this._host.engine.storeForSummary(resourceName, amount, "craft");
      this._host.engine.iactivity(
        "act.craft",
        [this._host.game.getDisplayValueExt(amount), resourceName],
        "ks-craft"
      );
    }
    _canCraft(name, amount) {
      if (!this._host.game.workshopTab.visible && name !== "wood") {
        return false;
      }
      const craft = this.getCraft(name);
      const enabled = mustExist(this.settings.resources[name]).enabled;
      let result = false;
      if (craft.unlocked && enabled) {
        result = true;
        const prices = this._host.game.workshop.getCraftPrice(craft);
        for (const price of prices) {
          const value = this.getValueAvailable(price.name);
          if (value < price.val * amount) {
            result = false;
          }
        }
      }
      return result;
    }
    /**
     * Retrieve the resource information object from the game.
     *
     * @param name The name of the craftable resource.
     * @returns The information object for the resource.
     */
    getCraft(name) {
      const craft = this._host.game.workshop.getCraft(name);
      if (!craft) {
        throw new Error(`Unable to find craft '${name}'`);
      }
      return craft;
    }
    /**
     * Check if we have enough resources to craft a single craftable resource.
     *
     * @param name The name of the resource.
     * @returns `true` if the build is possible; `false` otherwise.
     */
    singleCraftPossible(name) {
      if (!this._host.game.workshopTab.visible && name !== "wood") {
        return false;
      }
      const materials = this.getMaterials(name);
      for (const [material, amount] of objectEntries(materials)) {
        if (this.getValueAvailable(material) < amount) {
          return false;
        }
      }
      return true;
    }
    /**
     * Returns a hash of the required source resources and their
     * amount to craft the given resource.
     *
     * @param name The resource to craft.
     * @returns The source resources you need and how many.
     */
    getMaterials(name) {
      const materials = {};
      const craft = this.getCraft(name);
      const prices = this._host.game.workshop.getCraftPrice(craft);
      for (const price of prices) {
        materials[price.name] = price.val;
      }
      return materials;
    }
    /**
     * Determine how much of a resource is produced per tick. For craftable resources,
     * this also includes how many of them we *could* craft this tick.
     *
     * @param resource The resource to retrieve the production for.
     * @param cacheManager A `CacheManager` to use in the process.
     * @param preTrade ?
     * @returns The amount of resources produced per tick, adjusted arbitrarily.
     */
    getTickVal(resource, cacheManager, preTrade = void 0) {
      let production = this._host.game.getResourcePerTick(resource.name, true);
      if (resource.craftable) {
        let minProd = Number.MAX_VALUE;
        const materials = this.getMaterials(resource.name);
        for (const [mat, amount] of objectEntries(materials)) {
          const rat = (1 + this._host.game.getResCraftRatio(resource.name)) / amount;
          const addProd = this.getTickVal(this.getResource(mat));
          if (addProd === "ignore") {
            continue;
          }
          minProd = Math.min(addProd * rat, minProd);
        }
        production += minProd !== Number.MAX_VALUE ? minProd : 0;
      }
      if (production <= 0 && (resource.name === "spice" || resource.name === "blueprint")) {
        return "ignore";
      }
      if (!preTrade && !isNil(cacheManager)) {
        production += cacheManager.getResValue(resource.name);
      }
      return production;
    }
    /**
     * Determine the resources and their amount that would usually result from a hunt.
     *
     * @returns The amounts of resources usually gained from hunting.
     */
    getAverageHunt() {
      const output = {};
      const hunterRatio = this._host.game.getEffect("hunterRatio") + this._host.game.village.getEffectLeader("manager", 0);
      output["furs"] = 40 + 32.5 * hunterRatio;
      output["ivory"] = 50 * Math.min(0.225 + 0.01 * hunterRatio, 0.5) + 40 * hunterRatio * Math.min(0.225 + 0.01 * hunterRatio, 0.5);
      output["unicorns"] = 0.05;
      if (this.getValue("zebras") >= 10) {
        output["bloodstone"] = this.getValue("bloodstone") === 0 ? 0.05 : 5e-4;
      }
      if (this._host.game.ironWill && this._host.game.workshop.get("goldOre").researched) {
        output["gold"] = 0.625 + 0.625 * hunterRatio;
      }
      return output;
    }
    /**
     * Retrieve the information object for a resource.
     *
     * @param name The resource to retrieve info for.
     * @returns The information object for the resource.
     */
    getResource(name) {
      const res = this._host.game.resPool.get(name);
      if (isNil(res)) {
        throw new Error(`Unable to find resource ${name}`);
      }
      return res;
    }
    /**
     * Determine how many items of a resource are currently available.
     *
     * @param name The resource.
     * @returns How many items are currently available.
     */
    getValue(name) {
      return this.getResource(name).value;
    }
    /**
     * Determine how many items of the resource to always keep in stock.
     *
     * @param name The resource.
     * @returns How many items of the resource to always keep in stock.
     */
    getStock(name) {
      const resource = this._host.engine.settings.resources.resources[name];
      const stock = resource && resource.enabled ? resource.stock : 0;
      return stock;
    }
    /**
     * Retrieve the consume rate for a resource.
     *
     * @param name - The resource.
     * @returns The consume rate for the resource.
     */
    getConsume(name) {
      const resource = this._host.engine.settings.resources.resources[name];
      const consume = resource && resource.enabled ? resource.consume : 1;
      return consume;
    }
    /**
     * Determine how much of a resource is available for a certain operation
     * to use.
     *
     * @param name The resource to check.
     * @returns The available amount of the resource.
     */
    getValueAvailable(name) {
      let stock = this.getStock(name);
      if ("catnip" === name) {
        const pastureMeta = this._host.game.bld.getBuildingExt("pasture").meta;
        const aqueductMeta = this._host.game.bld.getBuildingExt("aqueduct").meta;
        const pastures = pastureMeta.stage === 0 ? pastureMeta.val : 0;
        const aqueducts = aqueductMeta.stage === 0 ? aqueductMeta.val : 0;
        const resPerTick = this.getPotentialCatnip(true, pastures, aqueducts);
        if (resPerTick < 0) {
          stock -= resPerTick * 202 * 5;
        }
      }
      let value = this.getValue(name);
      value = Math.max(value - stock, 0);
      const consume = this.getConsume(name);
      return value * consume;
    }
    /**
     * Determine how much catnip we have available to "work with" per tick.
     *
     * @param worstWeather Should the worst weather be assumed for this calculation?
     * @param pastures How many pastures to take into account.
     * @param aqueducts How many aqueducts to take into account
     * @returns The potential catnip per tick.
     */
    getPotentialCatnip(worstWeather, pastures, aqueducts) {
      let productionField = this._host.game.getEffect("catnipPerTickBase");
      if (worstWeather) {
        productionField *= 0.1;
        productionField *= 1 + this._host.game.getLimitedDR(this._host.game.getEffect("coldHarshness"), 1);
      } else {
        productionField *= this._host.game.calendar.getWeatherMod({ name: "catnip" }) + this._host.game.calendar.getCurSeason().modifiers["catnip"];
      }
      if (this._host.game.science.getPolicy("communism").researched) {
        productionField = 0;
      }
      const resourceProduction = this._host.game.village.getResProduction();
      const productionVillager = resourceProduction.catnip ? resourceProduction.catnip * (1 + this._host.game.getEffect("catnipJobRatio")) : 0;
      let baseProd = productionField + productionVillager;
      let hydroponics = this._host.game.space.getBuilding("hydroponics").val;
      if (this._host.game.prestige.meta[0].meta[21].researched) {
        if (this._host.game.calendar.cycle === 2) {
          hydroponics *= 2;
        }
        if (this._host.game.calendar.cycle === 7) {
          hydroponics *= 0.5;
        }
      }
      baseProd *= 1 + 0.03 * aqueducts + 0.025 * hydroponics;
      const isWinterComing = this._host.game.challenges.currentChallenge === "winterIsComing";
      const paragonBonus = isWinterComing ? 0 : this._host.game.prestige.getParagonProductionRatio();
      baseProd *= 1 + paragonBonus;
      baseProd *= 1 + this._host.game.religion.getSolarRevolutionRatio();
      if (!this._host.game.opts.disableCMBR) {
        baseProd *= 1 + this._host.game.getCMBRBonus();
      }
      baseProd = this._host.game.calendar.cycleEffectsFestival({ catnip: baseProd })["catnip"];
      let baseDemand = this._host.game.village.getResConsumption()["catnip"];
      const unicornPastures = this._host.game.bld.getBuildingExt("unicornPasture").meta.val;
      baseDemand *= 1 + this._host.game.getLimitedDR(pastures * -5e-3 + unicornPastures * -15e-4, 1);
      if (this._host.game.village.sim.kittens.length > 0 && this._host.game.village.happiness > 1) {
        const happyCon = this._host.game.village.happiness - 1;
        const catnipDemandWorkerRatioGlobal = this._host.game.getEffect(
          "catnipDemandWorkerRatioGlobal"
        );
        if (this._host.game.challenges.currentChallenge === "anarchy") {
          baseDemand *= 1 + happyCon * (1 + catnipDemandWorkerRatioGlobal);
        } else {
          baseDemand *= 1 + happyCon * (1 + catnipDemandWorkerRatioGlobal) * (1 - this._host.game.village.getFreeKittens() / this._host.game.village.sim.kittens.length);
        }
      }
      baseProd += baseDemand;
      baseProd += this._host.game.getResourcePerTickConvertion("catnip");
      return baseProd;
    }
    /**
     * Maintains the CSS classes in the resource indicators in the game UI to
     * reflect if the amount of resource in stock is below or above the desired
     * total amount to keep in stock.
     * The user can configure this in the Workshop automation section.
     */
    refreshStock() {
      for (const [name, resource] of objectEntries(this._host.engine.settings.resources.resources)) {
        if (resource.stock === 0) {
          continue;
        }
        const isBelow = this._host.game.resPool.get(name).value < resource.stock;
        const resourceCells = [
          // Resource table on the top.
          ...$(`#game .res-row.resource_${name} .res-cell.resAmount`),
          // Craft table on the bottom.
          ...$(`#game .res-row.resource_${name} .res-cell.resource-value`)
        ];
        if (!resourceCells) {
          continue;
        }
        for (const resourceCell of resourceCells) {
          resourceCell.classList.add(isBelow ? "ks-stock-below" : "ks-stock-above");
          resourceCell.classList.remove(isBelow ? "ks-stock-above" : "ks-stock-below");
        }
      }
    }
  }
  __publicField(WorkshopManager, "DEFAULT_CONSUME_RATE", 1);
  class ResourcesSettingsItem extends Setting {
    constructor(resource, enabled, consume = WorkshopManager.DEFAULT_CONSUME_RATE, stock = 0) {
      super(enabled);
      __privateAdd(this, _resource2, void 0);
      __publicField(this, "consume");
      __publicField(this, "stock", 0);
      __privateSet(this, _resource2, resource);
      this.consume = consume;
      this.stock = stock;
    }
    get resource() {
      return __privateGet(this, _resource2);
    }
  }
  _resource2 = new WeakMap();
  class ResourcesSettings extends Setting {
    constructor(resources = {
      alicorn: new ResourcesSettingsItem("alicorn", false, 1, 0),
      alloy: new ResourcesSettingsItem("alloy", false, 1, 0),
      antimatter: new ResourcesSettingsItem("antimatter", false, 1, 0),
      beam: new ResourcesSettingsItem("beam", false, 1, 0),
      blackcoin: new ResourcesSettingsItem("blackcoin", false, 1, 0),
      bloodstone: new ResourcesSettingsItem("bloodstone", false, 1, 0),
      blueprint: new ResourcesSettingsItem("blueprint", false, 1, 0),
      burnedParagon: new ResourcesSettingsItem("burnedParagon", false, 1, 0),
      catnip: new ResourcesSettingsItem("catnip", false, 1, 0),
      coal: new ResourcesSettingsItem("coal", false, 1, 0),
      compedium: new ResourcesSettingsItem("compedium", false, 1, 0),
      concrate: new ResourcesSettingsItem("concrate", false, 1, 0),
      culture: new ResourcesSettingsItem("culture", false, 1, 0),
      elderBox: new ResourcesSettingsItem("elderBox", false, 1, 0),
      eludium: new ResourcesSettingsItem("eludium", false, 1, 0),
      faith: new ResourcesSettingsItem("faith", false, 1, 0),
      furs: new ResourcesSettingsItem("furs", true, void 0, 1e3),
      gear: new ResourcesSettingsItem("gear", false, 1, 0),
      gflops: new ResourcesSettingsItem("gflops", false, 1, 0),
      gold: new ResourcesSettingsItem("gold", false, 1, 0),
      hashrates: new ResourcesSettingsItem("hashrates", false, 1, 0),
      iron: new ResourcesSettingsItem("iron", false, 1, 0),
      ivory: new ResourcesSettingsItem("ivory", false, 1, 0),
      karma: new ResourcesSettingsItem("karma", false, 1, 0),
      kerosene: new ResourcesSettingsItem("kerosene", false, 1, 0),
      kittens: new ResourcesSettingsItem("kittens", false, 1, 0),
      manpower: new ResourcesSettingsItem("manpower", false, 1, 0),
      manuscript: new ResourcesSettingsItem("manuscript", false, 1, 0),
      megalith: new ResourcesSettingsItem("megalith", false, 1, 0),
      minerals: new ResourcesSettingsItem("minerals", false, 1, 0),
      necrocorn: new ResourcesSettingsItem("necrocorn", false, 1, 0),
      oil: new ResourcesSettingsItem("oil", false, 1, 0),
      paragon: new ResourcesSettingsItem("paragon", false, 1, 0),
      parchment: new ResourcesSettingsItem("parchment", false, 1, 0),
      plate: new ResourcesSettingsItem("plate", false, 1, 0),
      relic: new ResourcesSettingsItem("relic", false, 1, 0),
      scaffold: new ResourcesSettingsItem("scaffold", false, 1, 0),
      science: new ResourcesSettingsItem("science", false, 1, 0),
      ship: new ResourcesSettingsItem("ship", false, 1, 0),
      slab: new ResourcesSettingsItem("slab", false, 1, 0),
      sorrow: new ResourcesSettingsItem("sorrow", false, 1, 0),
      spice: new ResourcesSettingsItem("spice", false, 1, 0),
      starchart: new ResourcesSettingsItem("starchart", true, 1, 500),
      steel: new ResourcesSettingsItem("steel", false, 1, 0),
      tanker: new ResourcesSettingsItem("tanker", false, 1, 0),
      tears: new ResourcesSettingsItem("tears", false, 1, 0),
      temporalFlux: new ResourcesSettingsItem("temporalFlux", false, 1, 0),
      thorium: new ResourcesSettingsItem("thorium", false, 1, 0),
      timeCrystal: new ResourcesSettingsItem("timeCrystal", false, 1, 0),
      titanium: new ResourcesSettingsItem("titanium", false, 1, 0),
      tMythril: new ResourcesSettingsItem("tMythril", false, 1, 0),
      unicorns: new ResourcesSettingsItem("unicorns", false, 1, 0),
      unobtainium: new ResourcesSettingsItem("unobtainium", false, 1, 0),
      uranium: new ResourcesSettingsItem("uranium", false, 1, 0),
      void: new ResourcesSettingsItem("void", false, 1, 0),
      wood: new ResourcesSettingsItem("wood", false, 1, 0),
      wrappingPaper: new ResourcesSettingsItem("wrappingPaper", false, 1, 0),
      zebras: new ResourcesSettingsItem("zebras", false, 1, 0)
    }) {
      super(true);
      __publicField(this, "resources");
      this.resources = resources;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.resources, settings.resources, (resource, item) => {
        resource.enabled = (item == null ? void 0 : item.enabled) ?? resource.enabled;
        resource.consume = (item == null ? void 0 : item.consume) ?? resource.consume;
        resource.stock = (item == null ? void 0 : item.stock) ?? resource.stock;
      });
    }
  }
  class StateSettings extends Setting {
    constructor(noConfirm = new Setting(false), compress = new Setting(true)) {
      super(true);
      __publicField(this, "noConfirm");
      __publicField(this, "compress");
      this.noConfirm = noConfirm;
      this.compress = compress;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      this.noConfirm.load(settings.noConfirm);
      this.compress.load(settings.compress);
    }
  }
  class EngineSettings extends Setting {
    constructor(enabled = false, filters = new LogFilterSettings(), resources = new ResourcesSettings(), states = new StateSettings(), language = FallbackLanguage) {
      super(enabled);
      /**
       * The interval at which the internal processing loop is run, in milliseconds.
       */
      __publicField(this, "interval", 2e3);
      /**
       * The currently selected language.
       */
      __publicField(this, "language");
      __publicField(this, "filters");
      __publicField(this, "resources");
      __publicField(this, "states");
      this.filters = filters;
      this.resources = resources;
      this.states = states;
      this.language = new SettingOptions(language, [
        { label: "Deutsch", value: "de" },
        { label: "English", value: "en" },
        { label: "עִברִית", value: "he" },
        { label: "中文", value: "zh" }
      ]);
    }
    load(settings, retainMetaBehavior = false) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      if (!retainMetaBehavior) {
        this.interval = settings.interval ?? this.interval;
        this.states.load(settings.states);
        this.language.load(settings.language);
      }
      this.filters.load(settings.filters);
      this.resources.load(settings.resources);
    }
  }
  class MissionSetting extends Setting {
    constructor(mission, enabled = false) {
      super(enabled);
      __privateAdd(this, _mission, void 0);
      __privateSet(this, _mission, mission);
    }
    get mission() {
      return __privateGet(this, _mission);
    }
  }
  _mission = new WeakMap();
  class MissionSettings extends Setting {
    constructor(enabled = false, missions = {
      centaurusSystemMission: new MissionSetting("centaurusSystemMission", true),
      charonMission: new MissionSetting("charonMission", true),
      duneMission: new MissionSetting("duneMission", true),
      furthestRingMission: new MissionSetting("furthestRingMission", true),
      heliosMission: new MissionSetting("heliosMission", true),
      kairoMission: new MissionSetting("kairoMission", true),
      moonMission: new MissionSetting("moonMission", true),
      orbitalLaunch: new MissionSetting("orbitalLaunch", true),
      piscineMission: new MissionSetting("piscineMission", true),
      rorschachMission: new MissionSetting("rorschachMission", true),
      terminusMission: new MissionSetting("terminusMission", true),
      umbraMission: new MissionSetting("umbraMission", true),
      yarnMission: new MissionSetting("yarnMission", true)
    }) {
      super(enabled);
      __publicField(this, "missions");
      this.missions = missions;
    }
    get missionsList() {
      return [
        this.missions.orbitalLaunch,
        this.missions.moonMission,
        this.missions.duneMission,
        this.missions.piscineMission,
        this.missions.heliosMission,
        this.missions.terminusMission,
        this.missions.kairoMission,
        this.missions.rorschachMission,
        this.missions.yarnMission,
        this.missions.umbraMission,
        this.missions.charonMission,
        this.missions.centaurusSystemMission,
        this.missions.furthestRingMission
      ];
    }
    static validateGame(game2, settings) {
      const inSettings = Object.keys(settings.missions);
      const inGame = (game2.space.programs ?? []).map((program) => program.name);
      const missingInSettings = difference(inGame, inSettings);
      const redundantInSettings = difference(inSettings, inGame);
      for (const mission of missingInSettings) {
        cwarn(`The space mission '${mission}' is not tracked in Kitten Scientists!`);
      }
      for (const mission of redundantInSettings) {
        cwarn(`The space mission '${mission}' is not a space mission in Kittens Game!`);
      }
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.missions, settings.missions, (mission, item) => {
        mission.enabled = (item == null ? void 0 : item.enabled) ?? mission.enabled;
      });
    }
  }
  class SpaceBuildingSetting extends SettingMax {
    constructor(building, enabled = false) {
      super(enabled);
      __privateAdd(this, _building3, void 0);
      __privateSet(this, _building3, building);
    }
    get building() {
      return __privateGet(this, _building3);
    }
  }
  _building3 = new WeakMap();
  class SpaceSettings extends SettingTrigger {
    constructor(enabled = false, trigger = 0, buildings = {
      containmentChamber: new SpaceBuildingSetting("containmentChamber"),
      cryostation: new SpaceBuildingSetting("cryostation"),
      entangler: new SpaceBuildingSetting("entangler"),
      heatsink: new SpaceBuildingSetting("heatsink"),
      hrHarvester: new SpaceBuildingSetting("hrHarvester"),
      hydrofracturer: new SpaceBuildingSetting("hydrofracturer"),
      hydroponics: new SpaceBuildingSetting("hydroponics"),
      moltenCore: new SpaceBuildingSetting("moltenCore"),
      moonBase: new SpaceBuildingSetting("moonBase"),
      moonOutpost: new SpaceBuildingSetting("moonOutpost"),
      orbitalArray: new SpaceBuildingSetting("orbitalArray"),
      planetCracker: new SpaceBuildingSetting("planetCracker"),
      researchVessel: new SpaceBuildingSetting("researchVessel"),
      sattelite: new SpaceBuildingSetting("sattelite"),
      spaceBeacon: new SpaceBuildingSetting("spaceBeacon"),
      spaceElevator: new SpaceBuildingSetting("spaceElevator"),
      spaceStation: new SpaceBuildingSetting("spaceStation"),
      spiceRefinery: new SpaceBuildingSetting("spiceRefinery"),
      sunforge: new SpaceBuildingSetting("sunforge"),
      sunlifter: new SpaceBuildingSetting("sunlifter"),
      tectonic: new SpaceBuildingSetting("tectonic"),
      terraformingStation: new SpaceBuildingSetting("terraformingStation")
    }, unlockMissions = new MissionSettings()) {
      super(enabled, trigger);
      __publicField(this, "buildings");
      __publicField(this, "unlockMissions");
      this.buildings = buildings;
      this.unlockMissions = unlockMissions;
    }
    static validateGame(game2, settings) {
      MissionSettings.validateGame(game2, settings.unlockMissions);
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.max = (item == null ? void 0 : item.max) ?? building.max;
      });
      this.unlockMissions.load(settings.unlockMissions);
    }
  }
  class ResetBonfireBuildingSetting extends SettingTrigger {
    constructor(building, enabled = false, trigger = 1) {
      super(enabled, trigger);
      __privateAdd(this, _building4, void 0);
      __privateSet(this, _building4, building);
    }
    get building() {
      return __privateGet(this, _building4);
    }
  }
  _building4 = new WeakMap();
  class ResetBonfireSettings extends Setting {
    constructor(enabled = false, buildings = {
      academy: new ResetBonfireBuildingSetting("academy", false, -1),
      accelerator: new ResetBonfireBuildingSetting("accelerator", false, -1),
      aiCore: new ResetBonfireBuildingSetting("aiCore", false, -1),
      amphitheatre: new ResetBonfireBuildingSetting("amphitheatre", false, -1),
      aqueduct: new ResetBonfireBuildingSetting("aqueduct", false, -1),
      barn: new ResetBonfireBuildingSetting("barn", false, -1),
      biolab: new ResetBonfireBuildingSetting("biolab", false, -1),
      brewery: new ResetBonfireBuildingSetting("brewery", false, -1),
      broadcasttower: new ResetBonfireBuildingSetting("broadcasttower", false, -1),
      calciner: new ResetBonfireBuildingSetting("calciner", false, -1),
      chapel: new ResetBonfireBuildingSetting("chapel", false, -1),
      chronosphere: new ResetBonfireBuildingSetting("chronosphere", false, -1),
      dataCenter: new ResetBonfireBuildingSetting("dataCenter", false, -1),
      factory: new ResetBonfireBuildingSetting("factory", false, -1),
      field: new ResetBonfireBuildingSetting("field", false, -1),
      harbor: new ResetBonfireBuildingSetting("harbor", false, -1),
      hut: new ResetBonfireBuildingSetting("hut", false, -1),
      hydroplant: new ResetBonfireBuildingSetting("hydroplant", false, -1),
      library: new ResetBonfireBuildingSetting("library", false, -1),
      logHouse: new ResetBonfireBuildingSetting("logHouse", false, -1),
      lumberMill: new ResetBonfireBuildingSetting("lumberMill", false, -1),
      magneto: new ResetBonfireBuildingSetting("magneto", false, -1),
      mansion: new ResetBonfireBuildingSetting("mansion", false, -1),
      mine: new ResetBonfireBuildingSetting("mine", false, -1),
      mint: new ResetBonfireBuildingSetting("mint", false, -1),
      observatory: new ResetBonfireBuildingSetting("observatory", false, -1),
      oilWell: new ResetBonfireBuildingSetting("oilWell", false, -1),
      pasture: new ResetBonfireBuildingSetting("pasture", false, -1),
      quarry: new ResetBonfireBuildingSetting("quarry", false, -1),
      reactor: new ResetBonfireBuildingSetting("reactor", false, -1),
      smelter: new ResetBonfireBuildingSetting("smelter", false, -1),
      solarfarm: new ResetBonfireBuildingSetting("solarfarm", false, -1),
      spaceport: new ResetBonfireBuildingSetting("spaceport", false, -1),
      steamworks: new ResetBonfireBuildingSetting("steamworks", false, -1),
      temple: new ResetBonfireBuildingSetting("temple", false, -1),
      tradepost: new ResetBonfireBuildingSetting("tradepost", false, -1),
      warehouse: new ResetBonfireBuildingSetting("warehouse", false, -1),
      workshop: new ResetBonfireBuildingSetting("workshop", false, -1),
      zebraForge: new ResetBonfireBuildingSetting("zebraForge", false, -1),
      zebraOutpost: new ResetBonfireBuildingSetting("zebraOutpost", false, -1),
      zebraWorkshop: new ResetBonfireBuildingSetting("zebraWorkshop", false, -1),
      ziggurat: new ResetBonfireBuildingSetting("ziggurat", false, -1)
    }) {
      super(enabled);
      __publicField(this, "buildings");
      this.buildings = buildings;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.trigger = (item == null ? void 0 : item.trigger) ?? building.trigger;
      });
    }
  }
  class ResetReligionBuildingSetting extends SettingTrigger {
    constructor(building, variant, enabled = false, trigger = 1) {
      super(enabled, trigger);
      __privateAdd(this, _building5, void 0);
      __privateAdd(this, _variant3, void 0);
      __privateSet(this, _building5, building);
      __privateSet(this, _variant3, variant);
    }
    get building() {
      return __privateGet(this, _building5);
    }
    get variant() {
      return __privateGet(this, _variant3);
    }
  }
  _building5 = new WeakMap();
  _variant3 = new WeakMap();
  class ResetReligionSettings extends Setting {
    constructor(enabled = false, buildings = {
      apocripha: new ResetReligionBuildingSetting(
        "apocripha",
        UnicornItemVariant.OrderOfTheSun,
        false,
        -1
      ),
      basilica: new ResetReligionBuildingSetting(
        "basilica",
        UnicornItemVariant.OrderOfTheSun,
        false,
        -1
      ),
      blackCore: new ResetReligionBuildingSetting(
        "blackCore",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      blackLibrary: new ResetReligionBuildingSetting(
        "blackLibrary",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      blackNexus: new ResetReligionBuildingSetting(
        "blackNexus",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      blackObelisk: new ResetReligionBuildingSetting(
        "blackObelisk",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      blackPyramid: new ResetReligionBuildingSetting(
        "blackPyramid",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      ),
      blackRadiance: new ResetReligionBuildingSetting(
        "blackRadiance",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      blazar: new ResetReligionBuildingSetting(
        "blazar",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      darkNova: new ResetReligionBuildingSetting(
        "darkNova",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      goldenSpire: new ResetReligionBuildingSetting(
        "goldenSpire",
        UnicornItemVariant.OrderOfTheSun,
        false,
        -1
      ),
      holyGenocide: new ResetReligionBuildingSetting(
        "holyGenocide",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      ivoryCitadel: new ResetReligionBuildingSetting(
        "ivoryCitadel",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      ),
      ivoryTower: new ResetReligionBuildingSetting(
        "ivoryTower",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      ),
      marker: new ResetReligionBuildingSetting("marker", UnicornItemVariant.Ziggurat, false, -1),
      scholasticism: new ResetReligionBuildingSetting(
        "scholasticism",
        UnicornItemVariant.OrderOfTheSun,
        false,
        -1
      ),
      singularity: new ResetReligionBuildingSetting(
        "singularity",
        UnicornItemVariant.Cryptotheology,
        false,
        -1
      ),
      skyPalace: new ResetReligionBuildingSetting(
        "skyPalace",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      ),
      solarchant: new ResetReligionBuildingSetting(
        "solarchant",
        UnicornItemVariant.OrderOfTheSun,
        false,
        -1
      ),
      solarRevolution: new ResetReligionBuildingSetting(
        "solarRevolution",
        UnicornItemVariant.OrderOfTheSun,
        false,
        -1
      ),
      stainedGlass: new ResetReligionBuildingSetting(
        "stainedGlass",
        UnicornItemVariant.OrderOfTheSun,
        false,
        -1
      ),
      sunAltar: new ResetReligionBuildingSetting(
        "sunAltar",
        UnicornItemVariant.OrderOfTheSun,
        false,
        -1
      ),
      sunspire: new ResetReligionBuildingSetting(
        "sunspire",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      ),
      templars: new ResetReligionBuildingSetting(
        "templars",
        UnicornItemVariant.OrderOfTheSun,
        false,
        -1
      ),
      transcendence: new ResetReligionBuildingSetting(
        "transcendence",
        UnicornItemVariant.OrderOfTheSun,
        false,
        -1
      ),
      unicornGraveyard: new ResetReligionBuildingSetting(
        "unicornGraveyard",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      ),
      unicornNecropolis: new ResetReligionBuildingSetting(
        "unicornNecropolis",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      ),
      unicornPasture: new ResetReligionBuildingSetting(
        "unicornPasture",
        UnicornItemVariant.UnicornPasture,
        false,
        -1
      ),
      unicornTomb: new ResetReligionBuildingSetting(
        "unicornTomb",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      ),
      unicornUtopia: new ResetReligionBuildingSetting(
        "unicornUtopia",
        UnicornItemVariant.Ziggurat,
        false,
        -1
      )
    }) {
      super(enabled);
      __publicField(this, "buildings");
      this.buildings = buildings;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.trigger = (item == null ? void 0 : item.trigger) ?? building.trigger;
      });
    }
  }
  class ResetResourcesSettingsItem extends Setting {
    constructor(resource, enabled, stock) {
      super(enabled);
      __privateAdd(this, _resource3, void 0);
      __publicField(this, "stock", 0);
      __privateSet(this, _resource3, resource);
      this.stock = stock;
    }
    get resource() {
      return __privateGet(this, _resource3);
    }
  }
  _resource3 = new WeakMap();
  class ResetResourcesSettings extends Setting {
    constructor(enabled = false, resources = {
      alicorn: new ResetResourcesSettingsItem("alicorn", false, 0),
      alloy: new ResetResourcesSettingsItem("alloy", false, 0),
      antimatter: new ResetResourcesSettingsItem("antimatter", false, 0),
      beam: new ResetResourcesSettingsItem("beam", false, 0),
      blackcoin: new ResetResourcesSettingsItem("blackcoin", false, 0),
      bloodstone: new ResetResourcesSettingsItem("bloodstone", false, 0),
      blueprint: new ResetResourcesSettingsItem("blueprint", false, 0),
      burnedParagon: new ResetResourcesSettingsItem("burnedParagon", false, 0),
      catnip: new ResetResourcesSettingsItem("catnip", false, 0),
      coal: new ResetResourcesSettingsItem("coal", false, 0),
      compedium: new ResetResourcesSettingsItem("compedium", false, 0),
      concrate: new ResetResourcesSettingsItem("concrate", false, 0),
      culture: new ResetResourcesSettingsItem("culture", false, 0),
      elderBox: new ResetResourcesSettingsItem("elderBox", false, 0),
      eludium: new ResetResourcesSettingsItem("eludium", false, 0),
      faith: new ResetResourcesSettingsItem("faith", false, 0),
      furs: new ResetResourcesSettingsItem("furs", false, 0),
      gear: new ResetResourcesSettingsItem("gear", false, 0),
      gold: new ResetResourcesSettingsItem("gold", false, 0),
      gflops: new ResetResourcesSettingsItem("gflops", false, 0),
      hashrates: new ResetResourcesSettingsItem("hashrates", false, 0),
      iron: new ResetResourcesSettingsItem("iron", false, 0),
      ivory: new ResetResourcesSettingsItem("ivory", false, 0),
      karma: new ResetResourcesSettingsItem("karma", false, 0),
      kerosene: new ResetResourcesSettingsItem("kerosene", false, 0),
      kittens: new ResetResourcesSettingsItem("kittens", false, 0),
      manpower: new ResetResourcesSettingsItem("manpower", false, 0),
      manuscript: new ResetResourcesSettingsItem("manuscript", false, 0),
      megalith: new ResetResourcesSettingsItem("megalith", false, 0),
      minerals: new ResetResourcesSettingsItem("minerals", false, 0),
      necrocorn: new ResetResourcesSettingsItem("necrocorn", false, 0),
      oil: new ResetResourcesSettingsItem("oil", false, 0),
      paragon: new ResetResourcesSettingsItem("paragon", false, 0),
      parchment: new ResetResourcesSettingsItem("parchment", false, 0),
      plate: new ResetResourcesSettingsItem("plate", false, 0),
      relic: new ResetResourcesSettingsItem("relic", false, 0),
      scaffold: new ResetResourcesSettingsItem("scaffold", false, 0),
      science: new ResetResourcesSettingsItem("science", false, 0),
      ship: new ResetResourcesSettingsItem("ship", false, 0),
      slab: new ResetResourcesSettingsItem("slab", false, 0),
      sorrow: new ResetResourcesSettingsItem("sorrow", false, 0),
      spice: new ResetResourcesSettingsItem("spice", false, 0),
      starchart: new ResetResourcesSettingsItem("starchart", false, 0),
      steel: new ResetResourcesSettingsItem("steel", false, 0),
      tanker: new ResetResourcesSettingsItem("tanker", false, 0),
      tears: new ResetResourcesSettingsItem("tears", false, 0),
      temporalFlux: new ResetResourcesSettingsItem("temporalFlux", false, 0),
      thorium: new ResetResourcesSettingsItem("thorium", false, 0),
      timeCrystal: new ResetResourcesSettingsItem("timeCrystal", false, 0),
      tMythril: new ResetResourcesSettingsItem("tMythril", false, 0),
      titanium: new ResetResourcesSettingsItem("titanium", false, 0),
      unicorns: new ResetResourcesSettingsItem("unicorns", false, 0),
      unobtainium: new ResetResourcesSettingsItem("unobtainium", false, 0),
      uranium: new ResetResourcesSettingsItem("uranium", false, 0),
      void: new ResetResourcesSettingsItem("void", false, 0),
      wood: new ResetResourcesSettingsItem("wood", false, 0),
      wrappingPaper: new ResetResourcesSettingsItem("wrappingPaper", false, 0),
      zebras: new ResetResourcesSettingsItem("zebras", false, 0)
    }) {
      super(enabled);
      __publicField(this, "resources");
      this.resources = resources;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.resources, settings.resources, (resource, item) => {
        resource.enabled = (item == null ? void 0 : item.enabled) ?? resource.enabled;
        resource.stock = (item == null ? void 0 : item.stock) ?? resource.stock;
      });
    }
  }
  class ResetSpaceBuildingSetting extends SettingTrigger {
    constructor(building, enabled = false, trigger = 1) {
      super(enabled, trigger);
      __privateAdd(this, _building6, void 0);
      __privateSet(this, _building6, building);
    }
    get building() {
      return __privateGet(this, _building6);
    }
  }
  _building6 = new WeakMap();
  class ResetSpaceSettings extends Setting {
    constructor(enabled = false, buildings = {
      containmentChamber: new ResetSpaceBuildingSetting("containmentChamber", false, -1),
      cryostation: new ResetSpaceBuildingSetting("cryostation", false, -1),
      entangler: new ResetSpaceBuildingSetting("entangler", false, -1),
      heatsink: new ResetSpaceBuildingSetting("heatsink", false, -1),
      hrHarvester: new ResetSpaceBuildingSetting("hrHarvester", false, -1),
      hydrofracturer: new ResetSpaceBuildingSetting("hydrofracturer", false, -1),
      hydroponics: new ResetSpaceBuildingSetting("hydroponics", false, -1),
      moltenCore: new ResetSpaceBuildingSetting("moltenCore", false, -1),
      moonBase: new ResetSpaceBuildingSetting("moonBase", false, -1),
      moonOutpost: new ResetSpaceBuildingSetting("moonOutpost", false, -1),
      orbitalArray: new ResetSpaceBuildingSetting("orbitalArray", false, -1),
      planetCracker: new ResetSpaceBuildingSetting("planetCracker", false, -1),
      researchVessel: new ResetSpaceBuildingSetting("researchVessel", false, -1),
      sattelite: new ResetSpaceBuildingSetting("sattelite", false, -1),
      spaceBeacon: new ResetSpaceBuildingSetting("spaceBeacon", false, -1),
      spaceElevator: new ResetSpaceBuildingSetting("spaceElevator", false, -1),
      spaceStation: new ResetSpaceBuildingSetting("spaceStation", false, -1),
      spiceRefinery: new ResetSpaceBuildingSetting("spiceRefinery", false, -1),
      sunforge: new ResetSpaceBuildingSetting("sunforge", false, -1),
      sunlifter: new ResetSpaceBuildingSetting("sunlifter", false, -1),
      tectonic: new ResetSpaceBuildingSetting("tectonic", false, -1),
      terraformingStation: new ResetSpaceBuildingSetting("terraformingStation", false, -1)
    }) {
      super(enabled);
      __publicField(this, "buildings");
      this.buildings = buildings;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.trigger = (item == null ? void 0 : item.trigger) ?? building.trigger;
      });
    }
  }
  class ResetTimeBuildingSetting extends SettingTrigger {
    constructor(id2, variant, enabled = false, trigger = 1) {
      super(enabled, trigger);
      __privateAdd(this, _building7, void 0);
      __privateAdd(this, _variant4, void 0);
      __privateSet(this, _building7, id2);
      __privateSet(this, _variant4, variant);
    }
    get building() {
      return __privateGet(this, _building7);
    }
    get variant() {
      return __privateGet(this, _variant4);
    }
  }
  _building7 = new WeakMap();
  _variant4 = new WeakMap();
  class ResetTimeSettings extends Setting {
    constructor(enabled = false, buildings = {
      blastFurnace: new ResetTimeBuildingSetting(
        "blastFurnace",
        TimeItemVariant.Chronoforge,
        false,
        -1
      ),
      chronocontrol: new ResetTimeBuildingSetting(
        "chronocontrol",
        TimeItemVariant.VoidSpace,
        false,
        -1
      ),
      cryochambers: new ResetTimeBuildingSetting(
        "cryochambers",
        TimeItemVariant.VoidSpace,
        false,
        -1
      ),
      ressourceRetrieval: new ResetTimeBuildingSetting(
        "ressourceRetrieval",
        TimeItemVariant.Chronoforge,
        false,
        -1
      ),
      temporalAccelerator: new ResetTimeBuildingSetting(
        "temporalAccelerator",
        TimeItemVariant.Chronoforge,
        false,
        -1
      ),
      temporalBattery: new ResetTimeBuildingSetting(
        "temporalBattery",
        TimeItemVariant.Chronoforge,
        false,
        -1
      ),
      temporalImpedance: new ResetTimeBuildingSetting(
        "temporalImpedance",
        TimeItemVariant.Chronoforge,
        false,
        -1
      ),
      temporalPress: new ResetTimeBuildingSetting(
        "temporalPress",
        TimeItemVariant.Chronoforge,
        false,
        -1
      ),
      timeBoiler: new ResetTimeBuildingSetting(
        "timeBoiler",
        TimeItemVariant.Chronoforge,
        false,
        -1
      ),
      voidHoover: new ResetTimeBuildingSetting("voidHoover", TimeItemVariant.VoidSpace, false, -1),
      voidResonator: new ResetTimeBuildingSetting(
        "voidResonator",
        TimeItemVariant.VoidSpace,
        false,
        -1
      ),
      voidRift: new ResetTimeBuildingSetting("voidRift", TimeItemVariant.VoidSpace, false, -1)
    }) {
      super(enabled);
      __publicField(this, "buildings");
      this.buildings = buildings;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.trigger = (item == null ? void 0 : item.trigger) ?? building.trigger;
      });
    }
  }
  class ResetUpgradeSetting extends Setting {
    constructor(upgrade, enabled = false) {
      super(enabled);
      __privateAdd(this, _upgrade3, void 0);
      __privateSet(this, _upgrade3, upgrade);
    }
    get upgrade() {
      return __privateGet(this, _upgrade3);
    }
  }
  _upgrade3 = new WeakMap();
  class ResetUpgradeSettings extends Setting {
    constructor(enabled = false, upgrades = {
      advancedAutomation: new ResetUpgradeSetting("advancedAutomation", false),
      advancedRefinement: new ResetUpgradeSetting("advancedRefinement", false),
      aiBases: new ResetUpgradeSetting("aiBases", false),
      aiEngineers: new ResetUpgradeSetting("aiEngineers", false),
      alloyArmor: new ResetUpgradeSetting("alloyArmor", false),
      alloyAxe: new ResetUpgradeSetting("alloyAxe", false),
      alloyBarns: new ResetUpgradeSetting("alloyBarns", false),
      alloySaw: new ResetUpgradeSetting("alloySaw", false),
      alloyWarehouses: new ResetUpgradeSetting("alloyWarehouses", false),
      amBases: new ResetUpgradeSetting("amBases", false),
      amDrive: new ResetUpgradeSetting("amDrive", false),
      amFission: new ResetUpgradeSetting("amFission", false),
      amReactors: new ResetUpgradeSetting("amReactors", false),
      amReactorsMK2: new ResetUpgradeSetting("amReactorsMK2", false),
      assistance: new ResetUpgradeSetting("assistance", false),
      astrolabe: new ResetUpgradeSetting("astrolabe", false),
      astrophysicists: new ResetUpgradeSetting("astrophysicists", false),
      augumentation: new ResetUpgradeSetting("augumentation", false),
      automatedPlants: new ResetUpgradeSetting("automatedPlants", false),
      barges: new ResetUpgradeSetting("barges", false),
      biofuel: new ResetUpgradeSetting("biofuel", false),
      bolas: new ResetUpgradeSetting("bolas", false),
      cadSystems: new ResetUpgradeSetting("cadSystems", false),
      caravanserai: new ResetUpgradeSetting("caravanserai", false),
      carbonSequestration: new ResetUpgradeSetting("carbonSequestration", false),
      cargoShips: new ResetUpgradeSetting("cargoShips", false),
      celestialMechanics: new ResetUpgradeSetting("celestialMechanics", false),
      chronoEngineers: new ResetUpgradeSetting("chronoEngineers", false),
      chronoforge: new ResetUpgradeSetting("chronoforge", false),
      coalFurnace: new ResetUpgradeSetting("coalFurnace", false),
      coldFusion: new ResetUpgradeSetting("coldFusion", false),
      combustionEngine: new ResetUpgradeSetting("combustionEngine", false),
      compositeBow: new ResetUpgradeSetting("compositeBow", false),
      concreteBarns: new ResetUpgradeSetting("concreteBarns", false),
      concreteHuts: new ResetUpgradeSetting("concreteHuts", false),
      concreteWarehouses: new ResetUpgradeSetting("concreteWarehouses", false),
      crossbow: new ResetUpgradeSetting("crossbow", false),
      cryocomputing: new ResetUpgradeSetting("cryocomputing", false),
      darkEnergy: new ResetUpgradeSetting("darkEnergy", false),
      deepMining: new ResetUpgradeSetting("deepMining", false),
      distorsion: new ResetUpgradeSetting("distorsion", false),
      electrolyticSmelting: new ResetUpgradeSetting("electrolyticSmelting", false),
      eludiumCracker: new ResetUpgradeSetting("eludiumCracker", false),
      eludiumHuts: new ResetUpgradeSetting("eludiumHuts", false),
      eludiumReflectors: new ResetUpgradeSetting("eludiumReflectors", false),
      energyRifts: new ResetUpgradeSetting("energyRifts", false),
      enrichedThorium: new ResetUpgradeSetting("enrichedThorium", false),
      enrichedUranium: new ResetUpgradeSetting("enrichedUranium", false),
      factoryAutomation: new ResetUpgradeSetting("factoryAutomation", false),
      factoryLogistics: new ResetUpgradeSetting("factoryLogistics", false),
      factoryOptimization: new ResetUpgradeSetting("factoryOptimization", false),
      factoryProcessing: new ResetUpgradeSetting("factoryProcessing", false),
      factoryRobotics: new ResetUpgradeSetting("factoryRobotics", false),
      fluidizedReactors: new ResetUpgradeSetting("fluidizedReactors", false),
      fluxCondensator: new ResetUpgradeSetting("fluxCondensator", false),
      fuelInjectors: new ResetUpgradeSetting("fuelInjectors", false),
      geodesy: new ResetUpgradeSetting("geodesy", false),
      gmo: new ResetUpgradeSetting("gmo", false),
      goldOre: new ResetUpgradeSetting("goldOre", false),
      hubbleTelescope: new ResetUpgradeSetting("hubbleTelescope", false),
      huntingArmor: new ResetUpgradeSetting("huntingArmor", false),
      hydroPlantTurbines: new ResetUpgradeSetting("hydroPlantTurbines", false),
      internet: new ResetUpgradeSetting("internet", false),
      invisibleBlackHand: new ResetUpgradeSetting("invisibleBlackHand", false),
      ironAxes: new ResetUpgradeSetting("ironAxes", false),
      ironHoes: new ResetUpgradeSetting("ironHoes", false),
      ironwood: new ResetUpgradeSetting("ironwood", false),
      lhc: new ResetUpgradeSetting("lhc", false),
      logistics: new ResetUpgradeSetting("logistics", false),
      longRangeSpaceships: new ResetUpgradeSetting("longRangeSpaceships", false),
      machineLearning: new ResetUpgradeSetting("machineLearning", false),
      mineralAxes: new ResetUpgradeSetting("mineralAxes", false),
      mineralHoes: new ResetUpgradeSetting("mineralHoes", false),
      miningDrill: new ResetUpgradeSetting("miningDrill", false),
      mWReactor: new ResetUpgradeSetting("mWReactor", false),
      nanosuits: new ResetUpgradeSetting("nanosuits", false),
      neuralNetworks: new ResetUpgradeSetting("neuralNetworks", false),
      nuclearPlants: new ResetUpgradeSetting("nuclearPlants", false),
      nuclearSmelters: new ResetUpgradeSetting("nuclearSmelters", false),
      offsetPress: new ResetUpgradeSetting("offsetPress", false),
      oilDistillation: new ResetUpgradeSetting("oilDistillation", false),
      oilRefinery: new ResetUpgradeSetting("oilRefinery", false),
      orbitalGeodesy: new ResetUpgradeSetting("orbitalGeodesy", false),
      oxidation: new ResetUpgradeSetting("oxidation", false),
      photolithography: new ResetUpgradeSetting("photolithography", false),
      photovoltaic: new ResetUpgradeSetting("photovoltaic", false),
      pneumaticPress: new ResetUpgradeSetting("pneumaticPress", false),
      printingPress: new ResetUpgradeSetting("printingPress", false),
      pumpjack: new ResetUpgradeSetting("pumpjack", false),
      pyrolysis: new ResetUpgradeSetting("pyrolysis", false),
      qdot: new ResetUpgradeSetting("qdot", false),
      railgun: new ResetUpgradeSetting("railgun", false),
      reactorVessel: new ResetUpgradeSetting("reactorVessel", false),
      refrigeration: new ResetUpgradeSetting("refrigeration", false),
      register: new ResetUpgradeSetting("register", false),
      reinforcedBarns: new ResetUpgradeSetting("reinforcedBarns", false),
      reinforcedSaw: new ResetUpgradeSetting("reinforcedSaw", false),
      reinforcedWarehouses: new ResetUpgradeSetting("reinforcedWarehouses", false),
      relicStation: new ResetUpgradeSetting("relicStation", false),
      rotaryKiln: new ResetUpgradeSetting("rotaryKiln", false),
      satelliteRadio: new ResetUpgradeSetting("satelliteRadio", false),
      satnav: new ResetUpgradeSetting("satnav", false),
      seti: new ResetUpgradeSetting("seti", false),
      silos: new ResetUpgradeSetting("silos", false),
      solarSatellites: new ResetUpgradeSetting("solarSatellites", false),
      spaceEngineers: new ResetUpgradeSetting("spaceEngineers", false),
      spaceManufacturing: new ResetUpgradeSetting("spaceManufacturing", false),
      spiceNavigation: new ResetUpgradeSetting("spiceNavigation", false),
      starlink: new ResetUpgradeSetting("starlink", false),
      stasisChambers: new ResetUpgradeSetting("stasisChambers", false),
      steelArmor: new ResetUpgradeSetting("steelArmor", false),
      steelAxe: new ResetUpgradeSetting("steelAxe", false),
      steelPlants: new ResetUpgradeSetting("steelPlants", false),
      steelSaw: new ResetUpgradeSetting("steelSaw", false),
      stoneBarns: new ResetUpgradeSetting("stoneBarns", false),
      storageBunkers: new ResetUpgradeSetting("storageBunkers", false),
      strenghtenBuild: new ResetUpgradeSetting("strenghtenBuild", false),
      tachyonAccelerators: new ResetUpgradeSetting("tachyonAccelerators", false),
      thinFilm: new ResetUpgradeSetting("thinFilm", false),
      thoriumEngine: new ResetUpgradeSetting("thoriumEngine", false),
      thoriumReactors: new ResetUpgradeSetting("thoriumReactors", false),
      titaniumAxe: new ResetUpgradeSetting("titaniumAxe", false),
      titaniumBarns: new ResetUpgradeSetting("titaniumBarns", false),
      titaniumMirrors: new ResetUpgradeSetting("titaniumMirrors", false),
      titaniumSaw: new ResetUpgradeSetting("titaniumSaw", false),
      titaniumWarehouses: new ResetUpgradeSetting("titaniumWarehouses", false),
      turnSmoothly: new ResetUpgradeSetting("turnSmoothly", false),
      unicornSelection: new ResetUpgradeSetting("unicornSelection", false),
      unobtainiumAxe: new ResetUpgradeSetting("unobtainiumAxe", false),
      unobtainiumDrill: new ResetUpgradeSetting("unobtainiumDrill", false),
      unobtainiumHuts: new ResetUpgradeSetting("unobtainiumHuts", false),
      unobtainiumReflectors: new ResetUpgradeSetting("unobtainiumReflectors", false),
      unobtainiumSaw: new ResetUpgradeSetting("unobtainiumSaw", false),
      uplink: new ResetUpgradeSetting("uplink", false),
      voidAspiration: new ResetUpgradeSetting("voidAspiration", false),
      voidEnergy: new ResetUpgradeSetting("voidEnergy", false),
      voidReactors: new ResetUpgradeSetting("voidReactors", false)
    }) {
      super(enabled);
      __publicField(this, "upgrades");
      this.upgrades = upgrades;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.upgrades, settings.upgrades, (upgrade, item) => {
        upgrade.enabled = (item == null ? void 0 : item.enabled) ?? upgrade.enabled;
      });
    }
  }
  class ResetSettings extends Setting {
    constructor(enabled = false, bonfire = new ResetBonfireSettings(), religion = new ResetReligionSettings(), resources = new ResetResourcesSettings(), space = new ResetSpaceSettings(), time = new ResetTimeSettings(), upgrades = new ResetUpgradeSettings()) {
      super(enabled);
      __publicField(this, "bonfire");
      __publicField(this, "religion");
      __publicField(this, "resources");
      __publicField(this, "space");
      __publicField(this, "time");
      __publicField(this, "upgrades");
      this.bonfire = bonfire;
      this.religion = religion;
      this.resources = resources;
      this.space = space;
      this.time = time;
      this.upgrades = upgrades;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      this.bonfire.load(settings.bonfire);
      this.religion.load(settings.religion);
      this.resources.load(settings.resources);
      this.space.load(settings.space);
      this.time.load(settings.time);
      this.upgrades.load(settings.upgrades);
    }
  }
  class TimeSkipSettings extends SettingTriggerMax {
    constructor(cycles = {
      charon: new Setting(true),
      umbra: new Setting(true),
      yarn: new Setting(true),
      helios: new Setting(true),
      cath: new Setting(true),
      redmoon: new Setting(false),
      dune: new Setting(true),
      piscine: new Setting(true),
      terminus: new Setting(true),
      kairo: new Setting(true)
    }, seasons = {
      spring: new Setting(true),
      summer: new Setting(false),
      autumn: new Setting(false),
      winter: new Setting(false)
    }, ignoreOverheat = new Setting(false)) {
      super(false, 5);
      __publicField(this, "cycles");
      __publicField(this, "seasons");
      __publicField(this, "ignoreOverheat");
      this.cycles = cycles;
      this.seasons = seasons;
      this.ignoreOverheat = ignoreOverheat;
    }
    get cyclesList() {
      return [
        this.cycles.charon,
        this.cycles.umbra,
        this.cycles.yarn,
        this.cycles.helios,
        this.cycles.cath,
        this.cycles.redmoon,
        this.cycles.dune,
        this.cycles.piscine,
        this.cycles.terminus,
        this.cycles.kairo
      ];
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.cycles, settings.cycles, (cycle, item) => {
        cycle.enabled = (item == null ? void 0 : item.enabled) ?? cycle.enabled;
      });
      consumeEntriesPedantic(this.seasons, settings.seasons, (season, item) => {
        season.enabled = (item == null ? void 0 : item.enabled) ?? season.enabled;
      });
      this.ignoreOverheat.load(settings.ignoreOverheat);
    }
  }
  class TimeControlSettings extends Setting {
    constructor(enabled = false, accelerateTime = new SettingTrigger(true, 1), reset = new ResetSettings(), timeSkip = new TimeSkipSettings()) {
      super(enabled);
      __publicField(this, "accelerateTime");
      __publicField(this, "timeSkip");
      __publicField(this, "reset");
      this.accelerateTime = accelerateTime;
      this.reset = reset;
      this.timeSkip = timeSkip;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      this.accelerateTime.load(settings.accelerateTime);
      this.reset.load(settings.reset);
      this.timeSkip.load(settings.timeSkip);
    }
  }
  class TimeSettingsItem extends SettingMax {
    constructor(building, variant, enabled = false) {
      super(enabled);
      __privateAdd(this, _building8, void 0);
      __privateAdd(this, _variant5, void 0);
      __privateSet(this, _building8, building);
      __privateSet(this, _variant5, variant);
    }
    get building() {
      return __privateGet(this, _building8);
    }
    get variant() {
      return __privateGet(this, _variant5);
    }
  }
  _building8 = new WeakMap();
  _variant5 = new WeakMap();
  class TimeSettings extends SettingTrigger {
    constructor(enabled = false, trigger = 1, buildings = {
      blastFurnace: new TimeSettingsItem("blastFurnace", TimeItemVariant.Chronoforge),
      chronocontrol: new TimeSettingsItem("chronocontrol", TimeItemVariant.VoidSpace),
      cryochambers: new TimeSettingsItem("cryochambers", TimeItemVariant.VoidSpace),
      ressourceRetrieval: new TimeSettingsItem("ressourceRetrieval", TimeItemVariant.Chronoforge),
      temporalAccelerator: new TimeSettingsItem("temporalAccelerator", TimeItemVariant.Chronoforge),
      temporalBattery: new TimeSettingsItem("temporalBattery", TimeItemVariant.Chronoforge),
      temporalImpedance: new TimeSettingsItem("temporalImpedance", TimeItemVariant.Chronoforge),
      temporalPress: new TimeSettingsItem("temporalPress", TimeItemVariant.Chronoforge),
      timeBoiler: new TimeSettingsItem("timeBoiler", TimeItemVariant.Chronoforge),
      voidHoover: new TimeSettingsItem("voidHoover", TimeItemVariant.VoidSpace),
      voidResonator: new TimeSettingsItem("voidResonator", TimeItemVariant.VoidSpace),
      voidRift: new TimeSettingsItem("voidRift", TimeItemVariant.VoidSpace)
    }, fixCryochambers = new Setting(false), turnOnChronoFurnace = new Setting(false)) {
      super(enabled, trigger);
      __publicField(this, "buildings");
      __publicField(this, "fixCryochambers");
      __publicField(this, "turnOnChronoFurnace");
      this.buildings = buildings;
      this.fixCryochambers = fixCryochambers;
      this.turnOnChronoFurnace = turnOnChronoFurnace;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.max = (item == null ? void 0 : item.max) ?? building.max;
      });
      this.fixCryochambers.load(settings.fixCryochambers);
      this.turnOnChronoFurnace.load(settings.turnOnChronoFurnace);
    }
  }
  class EmbassySetting extends SettingMax {
    constructor(race, enabled = false) {
      super(enabled);
      __privateAdd(this, _race, void 0);
      __privateSet(this, _race, race);
    }
    get race() {
      return __privateGet(this, _race);
    }
  }
  _race = new WeakMap();
  class EmbassySettings extends SettingTrigger {
    constructor(enabled = false, races = {
      dragons: new EmbassySetting("dragons", true),
      griffins: new EmbassySetting("griffins", true),
      leviathans: new EmbassySetting("leviathans", true),
      lizards: new EmbassySetting("lizards", true),
      nagas: new EmbassySetting("nagas", true),
      sharks: new EmbassySetting("sharks", true),
      spiders: new EmbassySetting("spiders", true),
      zebras: new EmbassySetting("zebras", true)
    }) {
      super(enabled);
      __publicField(this, "races");
      this.races = races;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.races, settings.races, (race, item) => {
        race.enabled = (item == null ? void 0 : item.enabled) ?? race.enabled;
        race.max = (item == null ? void 0 : item.max) ?? race.max;
      });
    }
  }
  class TradeSettingsItem extends SettingLimited {
    constructor(race, enabled, limited, summer, autumn, winter, spring, require2 = false) {
      super(enabled, limited);
      __privateAdd(this, _race2, void 0);
      __publicField(this, "seasons");
      /**
       * A resource that is required to trade with the race.
       */
      __privateAdd(this, _require, void 0);
      __privateSet(this, _race2, race);
      this.seasons = {
        summer: new Setting(summer),
        autumn: new Setting(autumn),
        winter: new Setting(winter),
        spring: new Setting(spring)
      };
      __privateSet(this, _require, require2);
    }
    get race() {
      return __privateGet(this, _race2);
    }
    get require() {
      return __privateGet(this, _require);
    }
  }
  _race2 = new WeakMap();
  _require = new WeakMap();
  class TradeSettings extends SettingTrigger {
    constructor(enabled = false, trigger = 1, races = {
      dragons: new TradeSettingsItem("dragons", true, true, true, true, true, true, "titanium"),
      griffins: new TradeSettingsItem("griffins", true, true, false, true, false, false, "wood"),
      leviathans: new TradeSettingsItem(
        "leviathans",
        true,
        true,
        true,
        true,
        true,
        true,
        "unobtainium"
      ),
      lizards: new TradeSettingsItem("lizards", true, true, true, false, false, false, "minerals"),
      nagas: new TradeSettingsItem("nagas", true, true, true, false, false, true),
      sharks: new TradeSettingsItem("sharks", true, true, false, false, true, false, "iron"),
      spiders: new TradeSettingsItem("spiders", true, true, true, true, false, true),
      zebras: new TradeSettingsItem("zebras", true, true, true, true, true, true)
    }, buildEmbassies = new EmbassySettings(), feedLeviathans = new Setting(false), tradeBlackcoin = new SettingBuySellTrigger(false, 1090, 1095, 1e4), unlockRaces = new Setting(true)) {
      super(enabled, trigger);
      __publicField(this, "races");
      __publicField(this, "feedLeviathans");
      __publicField(this, "buildEmbassies");
      __publicField(this, "tradeBlackcoin");
      __publicField(this, "unlockRaces");
      this.races = races;
      this.buildEmbassies = buildEmbassies;
      this.feedLeviathans = feedLeviathans;
      this.tradeBlackcoin = tradeBlackcoin;
      this.unlockRaces = unlockRaces;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.races, settings.races, (race, item) => {
        var _a, _b, _c, _d;
        race.enabled = (item == null ? void 0 : item.enabled) ?? race.enabled;
        race.limited = (item == null ? void 0 : item.limited) ?? race.limited;
        race.seasons.autumn.enabled = ((_a = item == null ? void 0 : item.seasons) == null ? void 0 : _a.autumn.enabled) ?? race.seasons.autumn.enabled;
        race.seasons.spring.enabled = ((_b = item == null ? void 0 : item.seasons) == null ? void 0 : _b.spring.enabled) ?? race.seasons.spring.enabled;
        race.seasons.summer.enabled = ((_c = item == null ? void 0 : item.seasons) == null ? void 0 : _c.summer.enabled) ?? race.seasons.summer.enabled;
        race.seasons.winter.enabled = ((_d = item == null ? void 0 : item.seasons) == null ? void 0 : _d.winter.enabled) ?? race.seasons.winter.enabled;
      });
      this.buildEmbassies.load(settings.buildEmbassies);
      this.feedLeviathans.load(settings.feedLeviathans);
      this.tradeBlackcoin.load(settings.tradeBlackcoin);
      this.unlockRaces.load(settings.unlockRaces);
    }
  }
  class ElectLeaderSettings extends Setting {
    constructor(enabled = false, job = new SettingOptions("priest", [
      { label: "Engineer", value: "engineer" },
      { label: "Farmer", value: "farmer" },
      { label: "Geologist", value: "geologist" },
      { label: "Hunter", value: "hunter" },
      { label: "Miner", value: "miner" },
      { label: "Priest", value: "priest" },
      { label: "Scholar", value: "scholar" },
      { label: "Woodcutter", value: "woodcutter" }
    ]), trait = new SettingOptions("wise", [
      { label: "Artisan", value: "engineer" },
      { label: "Chemist", value: "chemist" },
      { label: "Manager", value: "manager" },
      { label: "Merchant", value: "merchant" },
      { label: "Metallurgist", value: "metallurgist" },
      { label: "Philosopher", value: "wise" },
      { label: "Scientist", value: "scientist" },
      { label: "None", value: "none" }
    ])) {
      super(enabled);
      __publicField(this, "job");
      __publicField(this, "trait");
      this.job = job;
      this.trait = trait;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      this.job.load(settings.job);
      this.trait.load(settings.trait);
    }
  }
  class VillageSettings extends Setting {
    constructor(enabled = false, jobs = {
      engineer: new SettingMax(true, 1),
      farmer: new SettingMax(true, 1),
      geologist: new SettingMax(true, 1),
      hunter: new SettingMax(true, 1),
      miner: new SettingMax(true, 1),
      priest: new SettingMax(true, 1),
      scholar: new SettingMax(true, 1),
      woodcutter: new SettingMax(true, 1)
    }, holdFestivals = new Setting(true), hunt = new SettingTrigger(true, 0.98), promoteKittens = new SettingTrigger(true, 1), promoteLeader = new Setting(true), electLeader = new ElectLeaderSettings()) {
      super(enabled);
      __publicField(this, "jobs");
      __publicField(this, "holdFestivals");
      __publicField(this, "hunt");
      __publicField(this, "promoteKittens");
      __publicField(this, "promoteLeader");
      __publicField(this, "electLeader");
      this.jobs = jobs;
      this.holdFestivals = holdFestivals;
      this.hunt = hunt;
      this.promoteKittens = promoteKittens;
      this.promoteLeader = promoteLeader;
      this.electLeader = electLeader;
    }
    load(settings) {
      var _a, _b, _c;
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.jobs, settings.jobs, (job, item) => {
        job.enabled = (item == null ? void 0 : item.enabled) ?? job.enabled;
        job.max = (item == null ? void 0 : item.max) ?? job.max;
      });
      this.holdFestivals.enabled = ((_a = settings.holdFestivals) == null ? void 0 : _a.enabled) ?? this.holdFestivals.enabled;
      this.hunt.load(settings.hunt);
      this.promoteKittens.enabled = ((_b = settings.promoteKittens) == null ? void 0 : _b.enabled) ?? this.promoteKittens.enabled;
      this.promoteLeader.enabled = ((_c = settings.promoteLeader) == null ? void 0 : _c.enabled) ?? this.promoteLeader.enabled;
      this.electLeader.load(settings.electLeader);
    }
  }
  class SpaceManager {
    constructor(host, workshopManager, settings = new SpaceSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_bulkManager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Space");
      this._workshopManager = workshopManager;
      this._bulkManager = new BulkPurchaseHelper(this._host, this._workshopManager);
    }
    tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      this.autoBuild();
      if (this.settings.unlockMissions.enabled) {
        this.autoUnlock();
      }
    }
    /**
     * Try to build as many of the passed buildings as possible.
     * Usually, this is called at each iteration of the automation engine to
     * handle the building of items on the Space tab.
     *
     * @param builds The buildings to build.
     */
    autoBuild(builds = this.settings.buildings) {
      const bulkManager = this._bulkManager;
      const trigger = this.settings.trigger;
      this.manager.render();
      const metaData = {};
      for (const build of Object.values(builds)) {
        metaData[build.building] = this.getBuild(build.building);
      }
      const buildList = bulkManager.bulk(builds, metaData, trigger, "space");
      let refreshRequired = false;
      for (const build of buildList) {
        if (build.count > 0) {
          this.build(build.id, build.count);
          refreshRequired = true;
        }
      }
      if (refreshRequired) {
        this._host.game.ui.render();
      }
    }
    autoUnlock() {
      if (!this._host.game.tabs[6].visible) {
        return;
      }
      this.manager.render();
      const missions = this._host.game.space.meta[0].meta;
      missionLoop:
        for (let i = 0; i < missions.length; i++) {
          if (0 < missions[i].val || !missions[i].unlocked || !this.settings.unlockMissions.missionsList[i].enabled) {
            continue;
          }
          const model = this.manager.tab.GCPanel.children[i];
          const prices = mustExist(model.model.prices);
          for (const resource of prices) {
            if (this._workshopManager.getValueAvailable(resource.name) < resource.val) {
              continue missionLoop;
            }
          }
          model.domNode.click();
          if (i === 7 || i === 12) {
            this._host.engine.iactivity("upgrade.space.mission", [missions[i].label], "ks-upgrade");
          } else {
            this._host.engine.iactivity("upgrade.space", [missions[i].label], "ks-upgrade");
          }
        }
    }
    build(name, amount) {
      const build = this.getBuild(name);
      const button = this.getBuildButton(name);
      if (!build.unlocked || !button || !button.model.enabled || !this.settings.buildings[name].enabled) {
        return;
      }
      const amountTemp = amount;
      const label = build.label;
      amount = this._bulkManager.construct(button.model, button, amount);
      if (amount !== amountTemp) {
        cwarn(`${label} Amount ordered: ${amountTemp} Amount Constructed: ${amount}`);
      }
      this._host.engine.storeForSummary(label, amount, "build");
      if (amount === 1) {
        this._host.engine.iactivity("act.build", [label], "ks-build");
      } else {
        this._host.engine.iactivity("act.builds", [label, amount], "ks-build");
      }
    }
    getBuild(name) {
      return this._host.game.space.getBuilding(name);
    }
    getBuildButton(name) {
      const panels = this.manager.tab.planetPanels;
      for (const panel of panels) {
        for (const child of panel.children) {
          if (child.id === name) {
            return child;
          }
        }
      }
      return null;
    }
  }
  class TimeControlManager {
    constructor(host, bonfireManager, religionManager, spaceManager, workshopManager, settings = new TimeControlSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_bonfireManager");
      __publicField(this, "_religionManager");
      __publicField(this, "_spaceManager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Time");
      this._bonfireManager = bonfireManager;
      this._religionManager = religionManager;
      this._spaceManager = spaceManager;
      this._workshopManager = workshopManager;
    }
    async tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      if (this.settings.accelerateTime.enabled) {
        this.accelerateTime();
      }
      if (this.settings.timeSkip.enabled) {
        this.timeSkip();
      }
      if (this.settings.reset.enabled) {
        await this.autoReset(this._host.engine);
      }
    }
    async autoReset(engine) {
      if (this._host.game.challenges.currentChallenge) {
        return;
      }
      const checkedList = [];
      const checkList = [];
      const check = (buttons) => {
        if (checkList.length !== 0) {
          for (const button of buttons) {
            if (!button.model.metadata) {
              continue;
            }
            const name = button.model.metadata.name;
            const index = checkList.indexOf(name);
            if (index !== -1) {
              checkList.splice(index, 1);
              if (this._host.game.resPool.hasRes(mustExist(button.model.prices))) {
                return true;
              }
            }
          }
        }
        return false;
      };
      for (const [name, entry] of objectEntries(this.settings.reset.bonfire.buildings))
        if (entry.enabled) {
          let bld;
          try {
            bld = this._host.game.bld.getBuildingExt(name);
          } catch (error2) {
            bld = null;
          }
          if (isNil(bld)) {
            continue;
          }
          checkedList.push({
            name: bld.meta.label ?? mustExist(bld.meta.stages)[mustExist(bld.meta.stage)].label,
            trigger: entry.trigger,
            val: bld.meta.val
          });
          if (0 < entry.trigger) {
            if (bld.meta.val < entry.trigger) {
              return;
            }
          } else {
            checkList.push(name);
          }
        }
      const unicornPasture = this.settings.reset.religion.buildings.unicornPasture;
      if (unicornPasture.enabled) {
        const bld = this._host.game.bld.getBuildingExt("unicornPasture");
        checkedList.push({
          name: mustExist(bld.meta.label),
          trigger: unicornPasture.trigger,
          val: bld.meta.val
        });
        if (0 < unicornPasture.trigger) {
          if (bld.meta.val < unicornPasture.trigger) {
            return;
          }
        } else {
          checkList.push("unicornPasture");
        }
      }
      if (check(
        this._bonfireManager.manager.tab.children
      ) || checkList.length) {
        return;
      }
      for (const [name, entry] of objectEntries(this.settings.reset.space.buildings)) {
        if (entry.enabled) {
          const bld = this._host.game.space.getBuilding(name);
          checkedList.push({ name: bld.label, trigger: entry.trigger, val: bld.val });
          if (0 < entry.trigger) {
            if (bld.val < entry.trigger) {
              return;
            }
          } else {
            checkList.push(name);
          }
        }
      }
      if (checkList.length === 0) {
        const panels = this._spaceManager.manager.tab.planetPanels;
        for (const panel of panels) {
          for (const panelButton of panel.children) {
            const model = panelButton.model;
            const name = model.metadata.name;
            const index = checkList.indexOf(name);
            if (index !== -1) {
              checkList.splice(index, 1);
              if (this._host.game.resPool.hasRes(mustExist(model.prices))) {
                break;
              }
            }
          }
        }
      }
      if (checkList.length) {
        return;
      }
      for (const [name, entry] of objectEntries(this.settings.reset.religion.buildings)) {
        if (!entry.enabled) {
          continue;
        }
        const bld = mustExist(this._religionManager.getBuild(name, entry.variant));
        checkedList.push({ name: bld.label, trigger: entry.trigger, val: bld.val });
        if (0 < entry.trigger) {
          if (bld.val < entry.trigger) {
            return;
          }
        } else {
          checkList.push(name);
        }
      }
      if (check(
        this._religionManager.manager.tab.zgUpgradeButtons
      ) || check(
        this._religionManager.manager.tab.rUpgradeButtons
      ) || check(
        this._religionManager.manager.tab.children[0].children[0].children
      ) || checkList.length) {
        return;
      }
      for (const [name, entry] of objectEntries(this.settings.reset.time.buildings)) {
        if (entry.enabled) {
          const bld = mustExist(this.getBuild(name, entry.variant));
          checkedList.push({ name: bld.label, trigger: entry.trigger, val: bld.val });
          if (0 < entry.trigger) {
            if (bld.val < entry.trigger) {
              return;
            }
          } else {
            checkList.push(name);
          }
        }
      }
      if (check(
        this.manager.tab.children[2].children[0].children
      ) || check(
        this.manager.tab.children[3].children[0].children
      ) || checkList.length) {
        return;
      }
      for (const [name, entry] of objectEntries(this.settings.reset.resources.resources)) {
        if (entry.enabled) {
          const res = mustExist(this._host.game.resPool.get(name));
          checkedList.push({
            name: this._host.engine.i18n(`$resources.${entry.resource}.title`),
            trigger: entry.stock,
            val: res.value
          });
          if (res.value < entry.stock) {
            return;
          }
        }
      }
      for (const [, entry] of objectEntries(this.settings.reset.upgrades.upgrades)) {
        if (entry.enabled) {
          const upgrade = mustExist(
            this._host.game.workshop.upgrades.find((subject) => subject.name === entry.upgrade)
          );
          checkedList.push({ name: upgrade.label, trigger: 1, val: upgrade.researched ? 1 : 0 });
          if (!upgrade.researched) {
            return;
          }
        }
      }
      engine.stop(false);
      const sleep2 = async (time = 1500) => {
        return new Promise((resolve2, reject) => {
          if (!this._host.engine.settings.enabled) {
            return reject(new Error("canceled by player"));
          }
          setTimeout(resolve2, time);
        });
      };
      try {
        for (const checked of checkedList) {
          await sleep2(500);
          this._host.engine.imessage("reset.check", [
            checked.name,
            this._host.game.getDisplayValueExt(checked.trigger),
            this._host.game.getDisplayValueExt(checked.val)
          ]);
        }
        await sleep2(0);
        this._host.engine.imessage("reset.checked");
        await sleep2();
        this._host.engine.iactivity("reset.tip");
        await sleep2();
        this._host.engine.imessage("reset.countdown.10");
        await sleep2(2e3);
        this._host.engine.imessage("reset.countdown.9");
        await sleep2();
        this._host.engine.imessage("reset.countdown.8");
        await sleep2();
        this._host.engine.imessage("reset.countdown.7");
        await sleep2();
        this._host.engine.imessage("reset.countdown.6");
        await sleep2();
        this._host.engine.imessage("reset.countdown.5");
        await sleep2();
        this._host.engine.imessage("reset.countdown.4");
        await sleep2();
        this._host.engine.imessage("reset.countdown.3");
        await sleep2();
        this._host.engine.imessage("reset.countdown.2");
        await sleep2();
        this._host.engine.imessage("reset.countdown.1");
        await sleep2();
        this._host.engine.imessage("reset.countdown.0");
        await sleep2();
        this._host.engine.iactivity("reset.last.message");
        await sleep2();
      } catch (error2) {
        this._host.engine.imessage("reset.cancel.message");
        this._host.engine.iactivity("reset.cancel.activity");
        return;
      }
      for (let challengeIndex = 0; challengeIndex < this._host.game.challenges.challenges.length; challengeIndex++) {
        this._host.game.challenges.challenges[challengeIndex].pending = false;
      }
      this._host.game.resetAutomatic();
    }
    accelerateTime() {
      const temporalFluxAvailable = this._workshopManager.getValueAvailable("temporalFlux");
      if (temporalFluxAvailable <= 0) {
        if (this._host.game.time.isAccelerated) {
          this._host.game.time.isAccelerated = false;
        }
        return;
      }
      if (this._host.game.time.isAccelerated) {
        return;
      }
      const temporalFlux = this._host.game.resPool.get("temporalFlux");
      if (temporalFlux.maxValue * this.settings.accelerateTime.trigger <= temporalFlux.value) {
        this._host.game.time.isAccelerated = true;
        this._host.engine.iactivity("act.accelerate", [], "ks-accelerate");
        this._host.engine.storeForSummary("accelerate", 1);
      }
    }
    timeSkip() {
      if (!this._host.game.workshop.get("chronoforge").researched) {
        return;
      }
      if (this._host.game.calendar.day < 0) {
        return;
      }
      const shatterCostIncreaseChallenge = this._host.game.getEffect("shatterCostIncreaseChallenge");
      const timeCrystalsAvailable = this._workshopManager.getValueAvailable("timeCrystal");
      if (timeCrystalsAvailable < this.settings.timeSkip.trigger || timeCrystalsAvailable < 1 + shatterCostIncreaseChallenge) {
        return;
      }
      const shatterVoidCost = this._host.game.getEffect("shatterVoidCost");
      const voidAvailable = this._workshopManager.getValueAvailable("void");
      if (voidAvailable < shatterVoidCost) {
        return;
      }
      const season = this._host.game.calendar.season;
      if (!this.settings.timeSkip.seasons[this._host.game.calendar.seasons[season].name].enabled) {
        return;
      }
      const currentCycle = this._host.game.calendar.cycle;
      if (!this.settings.timeSkip.cyclesList[currentCycle].enabled) {
        return;
      }
      const heatMax = this._host.game.getEffect("heatMax");
      const heatNow = this._host.game.time.heat;
      if (!this.settings.timeSkip.ignoreOverheat.enabled) {
        if (heatMax <= heatNow) {
          return;
        }
      }
      const factor = this._host.game.challenges.getChallenge("1000Years").researched ? 5 : 10;
      const maxSkips = -1 === this.settings.timeSkip.max ? Number.POSITIVE_INFINITY : this.settings.timeSkip.max;
      let canSkip = Math.floor(
        Math.min(
          this.settings.timeSkip.ignoreOverheat.enabled ? Number.POSITIVE_INFINITY : (heatMax - heatNow) / factor,
          maxSkips,
          timeCrystalsAvailable / (1 + shatterCostIncreaseChallenge),
          0 < shatterVoidCost ? voidAvailable / shatterVoidCost : Number.POSITIVE_INFINITY
        )
      );
      let willSkip = 0;
      const yearsPerCycle = this._host.game.calendar.yearsPerCycle;
      const remainingYearsCurrentCycle = yearsPerCycle - this._host.game.calendar.cycleYear;
      const cyclesPerEra = this._host.game.calendar.cyclesPerEra;
      if (canSkip < remainingYearsCurrentCycle) {
        willSkip = canSkip;
      } else {
        willSkip += remainingYearsCurrentCycle;
        canSkip -= remainingYearsCurrentCycle;
        let skipCycles = 1;
        while (yearsPerCycle < canSkip && this.settings.timeSkip.cyclesList[(currentCycle + skipCycles) % cyclesPerEra].enabled) {
          willSkip += yearsPerCycle;
          canSkip -= yearsPerCycle;
          skipCycles += 1;
        }
        if (this.settings.timeSkip.cyclesList[(currentCycle + skipCycles) % cyclesPerEra].enabled && 0 < canSkip) {
          willSkip += canSkip;
        }
      }
      if (0 < willSkip) {
        const shatter = this._host.game.timeTab.cfPanel.children[0].children[0];
        this._host.engine.iactivity("act.time.skip", [willSkip], "ks-timeSkip");
        shatter.controller.doShatterAmt(shatter.model, willSkip);
        this._host.engine.storeForSummary("time.skip", willSkip);
      }
    }
    getBuild(name, variant) {
      if (variant === TimeItemVariant.Chronoforge) {
        return this._host.game.time.getCFU(name) ?? null;
      } else {
        return this._host.game.time.getVSU(name) ?? null;
      }
    }
  }
  class TimeManager {
    constructor(host, workshopManager, settings = new TimeSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_bulkManager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Time");
      this._bulkManager = new BulkPurchaseHelper(this._host, workshopManager);
      this._workshopManager = workshopManager;
    }
    tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      this.autoBuild();
      if (this.settings.fixCryochambers.enabled) {
        this.fixCryochambers();
      }
      if (this.settings.turnOnChronoFurnace.enabled) {
        this.turnOnChronoFurnace();
      }
    }
    /**
     * Try to build as many of the passed buildings as possible.
     * Usually, this is called at each iteration of the automation engine to
     * handle the building of items on the Time tab.
     *
     * @param builds The buildings to build.
     */
    autoBuild(builds = this.settings.buildings) {
      const bulkManager = this._bulkManager;
      const trigger = this.settings.trigger;
      this.manager.render();
      const metaData = {};
      for (const build of Object.values(builds)) {
        const buildMeta = this.getBuild(build.building, build.variant);
        metaData[build.building] = mustExist(buildMeta);
        const buildButton = this.getBuildButton(build.building, build.variant);
        if (isNil(buildButton)) {
          continue;
        }
        const model = buildButton.model;
        const panel = build.variant === TimeItemVariant.Chronoforge ? this.manager.tab.cfPanel : this.manager.tab.vsPanel;
        const buildingMetaData = mustExist(metaData[build.building]);
        buildingMetaData.tHidden = !model.visible || !model.enabled || !(panel == null ? void 0 : panel.visible);
      }
      const buildList = bulkManager.bulk(builds, metaData, trigger);
      let refreshRequired = false;
      for (const build of buildList) {
        if (build.count > 0) {
          this.build(
            build.id,
            build.variant,
            build.count
          );
          refreshRequired = true;
        }
      }
      if (refreshRequired) {
        this._host.game.ui.render();
      }
    }
    build(name, variant, amount) {
      const build = mustExist(this.getBuild(name, variant));
      const button = this.getBuildButton(name, variant);
      if (!button || !button.model.enabled) {
        return;
      }
      const amountTemp = amount;
      const label = build.label;
      amount = this._bulkManager.construct(button.model, button, amount);
      if (amount !== amountTemp) {
        cwarn(`${label} Amount ordered: ${amountTemp} Amount Constructed: ${amount}`);
      }
      this._host.engine.storeForSummary(label, amount, "build");
      if (amount === 1) {
        this._host.engine.iactivity("act.build", [label], "ks-build");
      } else {
        this._host.engine.iactivity("act.builds", [label, amount], "ks-build");
      }
    }
    getBuild(name, variant) {
      if (variant === TimeItemVariant.Chronoforge) {
        return this._host.game.time.getCFU(name) ?? null;
      } else {
        return this._host.game.time.getVSU(name) ?? null;
      }
    }
    getBuildButton(name, variant) {
      let buttons;
      if (variant === TimeItemVariant.Chronoforge) {
        buttons = this.manager.tab.children[2].children[0].children;
      } else {
        buttons = this.manager.tab.children[3].children[0].children;
      }
      const build = this.getBuild(name, variant);
      if (build === null) {
        throw new Error(`Unable to retrieve build information for '${name}'`);
      }
      for (const button of buttons) {
        if (button.model.name.startsWith(build.label)) {
          return button;
        }
      }
      return null;
    }
    fixCryochambers() {
      if (this._host.game.time.getVSU("usedCryochambers").val < 1) {
        return;
      }
      const prices = mustExist(this._host.game.time.getVSU("usedCryochambers").fixPrices);
      for (const price of prices) {
        const available = this._workshopManager.getValueAvailable(price.name);
        if (available < price.val) {
          return;
        }
      }
      const btn = this.manager.tab.vsPanel.children[0].children[0];
      let fixed = 0;
      let fixHappened;
      do {
        fixHappened = false;
        btn.controller.buyItem(
          btn.model,
          new MouseEvent("click"),
          // This callback is invoked at the end of the `buyItem` call.
          // Thus, the callback should be invoked before this loop ends.
          (didHappen) => {
            fixHappened = didHappen;
            fixed += didHappen ? 1 : 0;
          }
        );
      } while (fixHappened);
      if (0 < fixed) {
        this._host.engine.iactivity("act.fix.cry", [fixed], "ks-fixCry");
        this._host.engine.storeForSummary("fix.cry", fixed);
      }
    }
    turnOnChronoFurnace() {
      const chronoFurnace = this._host.game.time.getCFU("blastFurnace");
      if (!mustExist(chronoFurnace.isAutomationEnabled)) {
        const button = this.getBuildButton("blastFurnace", TimeItemVariant.Chronoforge);
        if (isNil(button)) {
          return;
        }
        button.controller.handleToggleAutomationLinkClick(button.model);
      }
    }
  }
  class TradeManager {
    constructor(host, workshopManager, settings = new TradeSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Trade");
      this._workshopManager = workshopManager;
    }
    tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      this.autoTrade();
      if (this.settings.unlockRaces.enabled) {
        this.autoUnlock();
      }
      if (this.settings.buildEmbassies.enabled) {
        this.autoBuildEmbassies();
      }
      if (this.settings.feedLeviathans.enabled) {
        this.autoFeedElders();
      }
      if (this.settings.tradeBlackcoin.enabled) {
        this.autoTradeBlackcoin();
      }
    }
    autoTrade(cacheManager) {
      const catpower = this._workshopManager.getResource("manpower");
      const gold = this._workshopManager.getResource("gold");
      const requireTrigger = this.settings.trigger;
      if (catpower.value / catpower.maxValue < requireTrigger || gold.value / gold.maxValue < requireTrigger) {
        return;
      }
      this.manager.render();
      if (!this.singleTradePossible()) {
        return;
      }
      const trades = [];
      const season = this._host.game.calendar.getCurSeason().name;
      for (const trade of Object.values(this.settings.races)) {
        const race = this.getRace(trade.race);
        if (!trade.enabled || !trade.seasons[season].enabled || !race.unlocked || !this.singleTradePossible(trade.race)) {
          continue;
        }
        const button = this.getTradeButton(race.name);
        if (!button.model.enabled) {
          continue;
        }
        const require2 = trade.require ? this._workshopManager.getResource(trade.require) : false;
        const profitable = this.getProfitability(trade.race);
        if (trade.limited && profitable) {
          trades.push(trade.race);
        } else if (
          // If this trade is not limited, it must either not require anything, or
          // the required resource must be over the trigger value.
          // Additionally, gold must also be over the trigger value.
          !require2 || requireTrigger <= require2.value / require2.maxValue
        ) {
          trades.push(trade.race);
        }
      }
      if (trades.length === 0) {
        return;
      }
      let maxTrades = this.getLowestTradeAmount(null, true, false);
      if (maxTrades < 1) {
        return;
      }
      const maxByRace = [];
      for (let tradeIndex = 0; tradeIndex < trades.length; tradeIndex++) {
        const race = trades[tradeIndex];
        const tradeSettings = this.settings.races[race];
        const require2 = !tradeSettings.require ? false : this._workshopManager.getResource(tradeSettings.require);
        const trigConditions = (!require2 || requireTrigger <= require2.value / require2.maxValue) && requireTrigger <= gold.value / gold.maxValue;
        const tradePos = this.getLowestTradeAmount(race, tradeSettings.limited, trigConditions);
        if (tradePos < 1) {
          trades.splice(tradeIndex, 1);
          tradeIndex--;
          continue;
        }
        maxByRace.push(tradePos);
      }
      if (trades.length === 0) {
        return;
      }
      const tradesDone = {};
      while (0 < trades.length && 1 <= maxTrades) {
        if (maxTrades < trades.length) {
          const randomRaceIndex = Math.floor(Math.random() * trades.length);
          if (!tradesDone[trades[randomRaceIndex]]) {
            tradesDone[trades[randomRaceIndex]] = 0;
          }
          tradesDone[trades[randomRaceIndex]] += 1;
          maxTrades -= 1;
          trades.splice(randomRaceIndex, 1);
          maxByRace.splice(randomRaceIndex, 1);
          continue;
        }
        let minTrades = Math.floor(maxTrades / trades.length);
        let minTradeIndex = 0;
        for (let tradeIndex = 0; tradeIndex < trades.length; ++tradeIndex) {
          if (maxByRace[tradeIndex] < minTrades) {
            minTrades = maxByRace[tradeIndex];
            minTradeIndex = tradeIndex;
          }
        }
        if (!tradesDone[trades[minTradeIndex]]) {
          tradesDone[trades[minTradeIndex]] = 0;
        }
        tradesDone[trades[minTradeIndex]] += minTrades;
        maxTrades -= minTrades;
        trades.splice(minTradeIndex, 1);
        maxByRace.splice(minTradeIndex, 1);
      }
      if (Object.values(tradesDone).length === 0) {
        return;
      }
      const tradeNet = {};
      for (const [name, amount] of objectEntries(tradesDone)) {
        const race = this.getRace(name);
        const materials = this.getMaterials(name);
        for (const [mat, matAmount] of objectEntries(materials)) {
          if (!tradeNet[mat]) {
            tradeNet[mat] = 0;
          }
          tradeNet[mat] -= matAmount * amount;
        }
        const meanOutput = this.getAverageTrade(race);
        for (const [out, outValue] of objectEntries(meanOutput)) {
          const res = this._workshopManager.getResource(out);
          if (!tradeNet[out]) {
            tradeNet[out] = 0;
          }
          tradeNet[out] += res.maxValue > 0 ? Math.min(
            mustExist(meanOutput[out]) * mustExist(tradesDone[name]),
            Math.max(res.maxValue - res.value, 0)
          ) : outValue * mustExist(tradesDone[name]);
        }
      }
      if (!isNil(cacheManager)) {
        cacheManager.pushToCache({
          materials: tradeNet,
          timeStamp: this._host.game.timer.ticksTotal
        });
      }
      for (const [name, count] of objectEntries(tradesDone)) {
        if (0 < count) {
          this.trade(name, count);
        }
      }
    }
    autoBuildEmbassies() {
      if (!this._host.game.diplomacy.races[0].embassyPrices) {
        return;
      }
      const culture = this._workshopManager.getResource("culture");
      let cultureVal = 0;
      const trigger = this.settings.buildEmbassies.trigger ?? 0;
      if (culture.value / culture.maxValue < trigger) {
        return;
      }
      const racePanels = this._host.game.diplomacyTab.racePanels;
      cultureVal = this._workshopManager.getValueAvailable("culture");
      const embassyBulk = {};
      const bulkTracker = [];
      for (let panelIndex = 0; panelIndex < racePanels.length; panelIndex++) {
        if (!racePanels[panelIndex].embassyButton) {
          continue;
        }
        const name = racePanels[panelIndex].race.name;
        const race = this._host.game.diplomacy.get(name);
        const max = this.settings.buildEmbassies.races[name].max === -1 ? Number.POSITIVE_INFINITY : this.settings.buildEmbassies.races[name].max;
        if (!this.settings.buildEmbassies.races[name].enabled || max <= race.embassyLevel || !race.unlocked) {
          continue;
        }
        embassyBulk[name] = {
          val: 0,
          max,
          basePrice: race.embassyPrices[0].val,
          currentEm: race.embassyLevel,
          priceSum: 0,
          race
        };
        bulkTracker.push(name);
      }
      if (bulkTracker.length === 0) {
        return;
      }
      let refreshRequired = false;
      while (bulkTracker.length > 0) {
        for (let raceIndex = 0; raceIndex < bulkTracker.length; raceIndex++) {
          const name = bulkTracker[raceIndex];
          const emBulk = mustExist(embassyBulk[name]);
          if (emBulk.max <= emBulk.currentEm + emBulk.val) {
            bulkTracker.splice(raceIndex, 1);
            --raceIndex;
            continue;
          }
          const nextPrice = emBulk.basePrice * Math.pow(1.15, emBulk.currentEm + emBulk.val);
          if (nextPrice <= cultureVal) {
            cultureVal -= nextPrice;
            emBulk.priceSum += nextPrice;
            emBulk.val += 1;
            refreshRequired = true;
          } else {
            bulkTracker.splice(raceIndex, 1);
            --raceIndex;
          }
        }
      }
      for (const [, emBulk] of objectEntries(embassyBulk)) {
        if (emBulk.val === 0) {
          continue;
        }
        cultureVal = this._workshopManager.getValueAvailable("culture");
        if (cultureVal < emBulk.priceSum) {
          cwarn("Something has gone horribly wrong.", emBulk.priceSum, cultureVal);
        }
        this._workshopManager.getResource("culture").value -= emBulk.priceSum;
        emBulk.race.embassyLevel += emBulk.val;
        this._host.engine.storeForSummary("embassy", emBulk.val);
        if (emBulk.val !== 1) {
          this._host.engine.iactivity("build.embassies", [emBulk.val, emBulk.race.title], "ks-build");
        } else {
          this._host.engine.iactivity("build.embassy", [emBulk.val, emBulk.race.title], "ks-build");
        }
      }
      if (refreshRequired) {
        this._host.game.ui.render();
      }
    }
    autoFeedElders() {
      const leviathanInfo = this._host.game.diplomacy.get("leviathans");
      const necrocorns = this._host.game.resPool.get("necrocorn");
      if (!leviathanInfo.unlocked || necrocorns.value === 0) {
        return;
      }
      if (1 <= necrocorns.value) {
        if (leviathanInfo.energy < this._host.game.diplomacy.getMarkerCap()) {
          this._host.game.diplomacy.feedElders();
          this._host.engine.iactivity("act.feed");
          this._host.engine.storeForSummary("feed", 1);
        }
      } else {
        if (0.25 * (1 + this._host.game.getEffect("corruptionBoostRatio")) < 1) {
          this._host.engine.storeForSummary("feed", necrocorns.value);
          this._host.game.diplomacy.feedElders();
          this._host.engine.iactivity("dispose.necrocorn");
        }
      }
    }
    autoUnlock() {
      if (!this._host.game.tabs[4].visible) {
        return;
      }
      const maxRaces = this._host.game.diplomacy.get("leviathans").unlocked ? 8 : 7;
      if (this._host.game.diplomacyTab.racePanels.length < maxRaces) {
        let refreshRequired = false;
        let manpower = this._workshopManager.getValueAvailable("manpower");
        if (!this._host.game.diplomacy.get("lizards").unlocked) {
          if (manpower >= 1e3) {
            this._host.game.resPool.get("manpower").value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            refreshRequired = true;
          }
        }
        if (!this._host.game.diplomacy.get("sharks").unlocked) {
          if (manpower >= 1e3) {
            this._host.game.resPool.get("manpower").value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            refreshRequired = true;
          }
        }
        if (!this._host.game.diplomacy.get("griffins").unlocked) {
          if (manpower >= 1e3) {
            this._host.game.resPool.get("manpower").value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            refreshRequired = true;
          }
        }
        if (!this._host.game.diplomacy.get("nagas").unlocked && this._host.game.resPool.get("culture").value >= 1500) {
          if (manpower >= 1e3) {
            this._host.game.resPool.get("manpower").value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            refreshRequired = true;
          }
        }
        if (!this._host.game.diplomacy.get("zebras").unlocked && this._host.game.resPool.get("ship").value >= 1) {
          if (manpower >= 1e3) {
            this._host.game.resPool.get("manpower").value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            refreshRequired = true;
          }
        }
        if (!this._host.game.diplomacy.get("spiders").unlocked && mustExist(this._host.game.resPool.get("ship")).value >= 100 && mustExist(this._host.game.resPool.get("science")).maxValue > 125e3) {
          if (manpower >= 1e3) {
            mustExist(this._host.game.resPool.get("manpower")).value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            refreshRequired = true;
          }
        }
        if (!this._host.game.diplomacy.get("dragons").unlocked && this._host.game.science.get("nuclearFission").researched) {
          if (manpower >= 1e3) {
            mustExist(this._host.game.resPool.get("manpower")).value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            refreshRequired = true;
          }
        }
        if (refreshRequired) {
          this._host.game.ui.render();
        }
      }
    }
    autoTradeBlackcoin() {
      const coinPrice = this._host.game.calendar.cryptoPrice;
      const relicsInitial = this._host.game.resPool.get("relic").value;
      const coinsInitial = this._host.game.resPool.get("blackcoin").value;
      let coinsExchanged = 0;
      let relicsExchanged = 0;
      if (coinPrice < (this.settings.tradeBlackcoin.buy ?? 950) && (this.settings.tradeBlackcoin.trigger ?? 0) < relicsInitial) {
        if (typeof this._host.game.diplomacy.buyEcoin === "function") {
          this._host.game.diplomacy.buyEcoin();
        } else {
          this._host.game.diplomacy.buyBcoin();
        }
        const currentCoin = this._host.game.resPool.get("blackcoin").value;
        coinsExchanged = Math.round(currentCoin - coinsInitial);
        this._host.engine.iactivity("blackcoin.buy", [coinsExchanged]);
      } else if (coinPrice > (this.settings.tradeBlackcoin.sell ?? 1050) && 0 < this._host.game.resPool.get("blackcoin").value) {
        if (typeof this._host.game.diplomacy.sellEcoin === "function") {
          this._host.game.diplomacy.sellEcoin();
        } else {
          this._host.game.diplomacy.sellBcoin();
        }
        const relicsCurrent = mustExist(this._host.game.resPool.get("relic")).value;
        relicsExchanged = Math.round(relicsCurrent - relicsInitial);
        this._host.engine.iactivity("blackcoin.sell", [relicsExchanged]);
      }
    }
    /**
     * Trade with the given race.
     *
     * @param name The race to trade with.
     * @param amount How often to trade with the race.
     */
    trade(name, amount) {
      if (!name || 1 > amount) {
        cwarn(
          "KS trade checks are not functioning properly, please create an issue on the github page."
        );
      }
      const race = this.getRace(name);
      const button = this.getTradeButton(race.name);
      if (!button.model.enabled || !this.settings.races[name].enabled) {
        cwarn(
          "KS trade checks are not functioning properly, please create an issue on the github page."
        );
      }
      this._host.game.diplomacy.tradeMultiple(race, amount);
      this._host.engine.storeForSummary(race.title, amount, "trade");
      this._host.engine.iactivity("act.trade", [amount, ucfirst(race.title)], "ks-trade");
    }
    /**
     * Determine if a trade with the given race would be considered profitable.
     *
     * @param name The race to trade with.
     * @returns `true` if the trade is profitable; `false` otherwise.
     */
    getProfitability(name) {
      const race = this.getRace(name);
      let cost = 0;
      const materials = this.getMaterials(name);
      for (const [mat, amount] of objectEntries(materials)) {
        const tick = this._workshopManager.getTickVal(this._workshopManager.getResource(mat));
        if (tick === "ignore") {
          continue;
        }
        if (tick <= 0) {
          return false;
        }
        cost += amount / tick;
      }
      let profit = 0;
      const output = this.getAverageTrade(race);
      for (const [prod, amount] of objectEntries(output)) {
        const resource = this._workshopManager.getResource(prod);
        const tick = this._workshopManager.getTickVal(resource);
        if (tick === "ignore") {
          continue;
        }
        if (tick <= 0) {
          return true;
        }
        profit += // For capped resources...
        0 < resource.maxValue ? (
          // ... only add as much to the profit as we can store.
          Math.min(amount, Math.max(resource.maxValue - resource.value, 0)) / tick
        ) : (
          // For uncapped resources, add all of it.
          amount / tick
        );
      }
      return cost <= profit;
    }
    /**
     * Determine which resources and how much of them a trade with the given race results in.
     *
     * @param race The race to check.
     * @returns The resources returned from an average trade and their amount.
     */
    getAverageTrade(race) {
      const standingRatio = this._host.game.getEffect("standingRatio") + this._host.game.diplomacy.calculateStandingFromPolicies(race.name, this._host.game);
      const raceRatio = 1 + race.energy * 0.02;
      const tradeRatio = 1 + this._host.game.diplomacy.getTradeRatio() + this._host.game.diplomacy.calculateTradeBonusFromPolicies(race.name, this._host.game);
      const failedRatio = race.standing < 0 ? race.standing + standingRatio : 0;
      const successRatio = 0 < failedRatio ? 1 + failedRatio : 1;
      const bonusRatio = 0 < race.standing ? Math.min(race.standing + standingRatio / 2, 1) : 0;
      const output = {};
      for (const item of race.sells) {
        if (!this._isValidTrade(item, race)) {
          output[item.name] = 0;
          continue;
        }
        let mean = 0;
        const tradeChance = race.embassyPrices ? item.chance * (1 + this._host.game.getLimitedDR(0.01 * race.embassyLevel, 0.75)) : item.chance;
        if (race.name === "zebras" && item.name === "titanium") {
          const shipCount = this._host.game.resPool.get("ship").value;
          const titaniumProbability = Math.min(0.15 + shipCount * 35e-4, 1);
          const titaniumRatio = 1 + shipCount / 50;
          mean = 1.5 * titaniumRatio * (successRatio * titaniumProbability);
        } else {
          const seasionRatio = !item.seasons ? 1 : 1 + item.seasons[this._host.game.calendar.getCurSeason().name];
          const normBought = (successRatio - bonusRatio) * Math.min(tradeChance / 100, 1);
          const normBonus = bonusRatio * Math.min(tradeChance / 100, 1);
          mean = (normBought + 1.25 * normBonus) * item.value * raceRatio * seasionRatio * tradeRatio;
        }
        output[item.name] = mean;
      }
      const spiceChance = race.embassyPrices ? 0.35 * (1 + 0.01 * race.embassyLevel) : 0.35;
      const spiceTradeAmount = successRatio * Math.min(spiceChance, 1);
      output.spice = 25 * spiceTradeAmount + 50 * spiceTradeAmount * tradeRatio / 2;
      output.blueprint = 0.1 * successRatio;
      return output;
    }
    /**
     * Determine if this trade is valid.
     *
     * @param item The tradeable item.
     * @param race The race to trade with.
     * @returns `true` if the trade is valid; `false` otherwise.
     */
    _isValidTrade(item, race) {
      return (
        // Do we have enough embassies to receive the item?
        !(item.minLevel && race.embassyLevel < item.minLevel) && // TODO: These seem a bit too magical.
        (this._host.game.resPool.get(item.name).unlocked || item.name === "titanium" || item.name === "uranium" || race.name === "leviathans")
      );
    }
    /**
     * Determine how many trades are at least possible.
     *
     * @param name The race to trade with.
     * @param limited Is the race set to be limited.
     * @param trigConditions Ignored
     * @returns The lowest number of trades possible with this race.
     */
    getLowestTradeAmount(name, limited, trigConditions) {
      let amount = void 0;
      const materials = this.getMaterials(name);
      let total = void 0;
      for (const [resource, required2] of objectEntries(materials)) {
        if (resource === "manpower") {
          total = this._workshopManager.getValueAvailable(resource) / required2;
        } else {
          total = this._workshopManager.getValueAvailable(resource) / required2;
        }
        amount = amount === void 0 || total < amount ? total : amount;
      }
      amount = Math.floor(amount ?? 0);
      if (amount === 0) {
        return 0;
      }
      if (name === null || name === "leviathans") {
        return amount;
      }
      const race = this.getRace(name);
      let highestCapacity = 0;
      const tradeOutput = this.getAverageTrade(race);
      for (const item of race.sells) {
        const resource = this._workshopManager.getResource(item.name);
        let max = 0;
        if (!resource.maxValue) {
          continue;
        }
        max = mustExist(tradeOutput[item.name]);
        const capacity = Math.max((resource.maxValue - resource.value) / max, 0);
        highestCapacity = capacity < highestCapacity ? highestCapacity : capacity;
      }
      highestCapacity = Math.ceil(highestCapacity);
      if (highestCapacity === 0) {
        return 0;
      }
      amount = highestCapacity < amount ? Math.max(highestCapacity - 1, 1) : amount;
      return Math.floor(amount);
    }
    /**
     * Determine the resources required to trade with the given race.
     *
     * @param race The race to check. If not specified the resources for any
     * trade will be returned.
     * @returns The resources need to trade with the race.
     */
    getMaterials(race = null) {
      const materials = {
        manpower: 50 - this._host.game.getEffect("tradeCatpowerDiscount"),
        gold: 15 - this._host.game.getEffect("tradeGoldDiscount")
      };
      if (isNil(race)) {
        return materials;
      }
      const prices = this.getRace(race).buys;
      for (const price of prices) {
        materials[price.name] = price.val;
      }
      return materials;
    }
    /**
     * Retrieve information about the given race from the game.
     *
     * @param name The race to get the information object for.
     * @returns The information object for the given race.
     */
    getRace(name) {
      const raceInfo = this._host.game.diplomacy.get(name);
      if (isNil(raceInfo)) {
        throw new Error(`Unable to retrieve race '${name}'`);
      }
      return raceInfo;
    }
    /**
     * Retrieve a reference to the trade button for the given race from the game.
     *
     * @param race The race to get the button reference for.
     * @returns The reference to the trade button.
     */
    getTradeButton(race) {
      const panel = this.manager.tab.racePanels.find((subject) => subject.race.name === race);
      if (isNil(panel)) {
        throw new Error(`Unable to find trade button for '${race}'`);
      }
      return panel.tradeBtn;
    }
    /**
     * Determine if at least a single trade can be made.
     *
     * @param name The race to trade with. If not specified, all races are checked.
     * @returns If the requested trade is possible.
     */
    singleTradePossible(name) {
      const materials = this.getMaterials(name);
      for (const [resource, amount] of objectEntries(materials)) {
        if (this._workshopManager.getValueAvailable(resource) < amount) {
          return false;
        }
      }
      return true;
    }
  }
  class MaterialsCache {
    constructor(host) {
      __publicField(this, "_host");
      __publicField(this, "_cache", new Array());
      __publicField(this, "_cacheSum", {});
      this._host = host;
    }
    /**
     * Store a set of materials in the cache.
     * This is usually done *after* hunting and trading.
     * TODO: This is indicative of the desire to know the resource state at the beginning of
     *       a frame. This is likely required to make different automations play nice together.
     *
     * @param data The materials to store in the cache.
     * @param data.materials The materials themselves.
     * @param data.timeStamp The current time.
     */
    pushToCache(data) {
      this._cache.push(data);
      for (const [mat, amount] of objectEntries(data.materials)) {
        if (!this._cacheSum[mat]) {
          this._cacheSum[mat] = 0;
        }
        this._cacheSum[mat] += amount;
      }
      for (let cacheIndex = 0; cacheIndex < this._cache.length; ++cacheIndex) {
        const oldData = this._cache[cacheIndex];
        if (this._cache.length > 1e4) {
          const oldMaterials = oldData.materials;
          for (const [mat, amount] of objectEntries(oldMaterials)) {
            if (!this._cacheSum[mat]) {
              this._cacheSum[mat] = 0;
            }
            this._cacheSum[mat] -= amount;
          }
          this._cache.shift();
          cacheIndex--;
        } else {
          return;
        }
      }
    }
    /**
     * Retrieve the resource amount that is stored in the cache.
     *
     * @param resource The resource to check.
     * @returns The cached resource amount, divided by how long it has been cached.
     */
    getResValue(resource) {
      if (this._cache.length === 0 || !this._cacheSum[resource]) {
        return 0;
      }
      const currentTick = this._host.game.timer.ticksTotal;
      const startingTick = this._cache[0].timeStamp;
      return this._cacheSum[resource] / (currentTick - startingTick);
    }
  }
  class VillageManager {
    constructor(host, workshopManager, settings = new VillageSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_cacheManager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Village");
      this._cacheManager = new MaterialsCache(this._host);
      this._workshopManager = workshopManager;
    }
    tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      this.autoDistributeKittens();
      if (this.settings.hunt.enabled) {
        this.autoHunt(this._cacheManager);
      }
      if (this.settings.holdFestivals.enabled) {
        this.autoFestival(this._cacheManager);
      }
      if (this.settings.electLeader.enabled) {
        this.autoElect();
      }
      if (this.settings.promoteLeader.enabled) {
        this.autoPromoteLeader();
      }
      if (this.settings.promoteKittens.enabled) {
        this.autoPromoteKittens();
      }
    }
    autoDistributeKittens() {
      const freeKittens = this._host.game.village.getFreeKittens();
      if (!freeKittens) {
        return;
      }
      for (let assignedKitten = 0; assignedKitten < freeKittens; ++assignedKitten) {
        const jobsNotCapped = new Array();
        for (const job of this._host.game.village.jobs) {
          const enabled = this.settings.jobs[job.name].enabled;
          const unlocked = job.unlocked;
          if (!enabled || !unlocked) {
            continue;
          }
          const maxKittensInJob = this._host.game.village.getJobLimit(job.name);
          const maxKittensToAssign = this.settings.jobs[job.name].max === -1 ? Number.POSITIVE_INFINITY : this.settings.jobs[job.name].max;
          const kittensInJob = job.value;
          if (kittensInJob < maxKittensInJob && kittensInJob < maxKittensToAssign) {
            jobsNotCapped.push({ job, count: kittensInJob, toCap: maxKittensInJob - kittensInJob });
          }
        }
        if (!jobsNotCapped.length) {
          return;
        }
        const noFarmersAssigned = !isNil(
          jobsNotCapped.find((job) => job.job.name === "farmer" && job.count === 0)
        );
        jobsNotCapped.sort((a, b) => a.count - b.count);
        const jobName = noFarmersAssigned ? "farmer" : jobsNotCapped[0].job.name;
        this._host.game.village.assignJob(this._host.game.village.getJob(jobName), 1);
        this.manager.render();
        this._host.engine.iactivity(
          "act.distribute",
          [this._host.engine.i18n(`$village.job.${jobName}`)],
          "ks-distribute"
        );
      }
      this._host.engine.storeForSummary("distribute", freeKittens);
    }
    autoElect() {
      const kittens = this._host.game.village.sim.kittens;
      const leader = this._host.game.village.leader;
      const job = this.settings.electLeader.job.selected;
      const trait = this.settings.electLeader.trait.selected;
      const leaderCandidates = kittens.filter(
        (kitten) => kitten.job === job && kitten.trait.name === trait
      );
      if (leaderCandidates.length === 0) {
        return;
      }
      leaderCandidates.sort((a, b) => b.rank - a.rank);
      const bestLeader = leaderCandidates[0];
      if (!isNil(leader)) {
        if (leader.trait.name === trait && leader.job === job && bestLeader.rank <= leader.rank) {
          return;
        }
      }
      this._host.game.villageTab.censusPanel.census.makeLeader(bestLeader);
      this._host.engine.iactivity("act.elect");
    }
    autoPromoteKittens() {
      const gold = this._workshopManager.getResource("gold");
      if (this.settings.promoteKittens.trigger < gold.value / gold.maxValue) {
        return;
      }
      for (let kittenIndex = 0; kittenIndex < this._host.game.village.sim.kittens.length; kittenIndex++) {
        let tier = -1;
        const engineerSpeciality = this._host.game.village.sim.kittens[kittenIndex].engineerSpeciality;
        if (isNil(engineerSpeciality)) {
          continue;
        }
        tier = mustExist(this._host.game.workshop.getCraft(engineerSpeciality)).tier;
        if (tier <= this._host.game.village.sim.kittens[kittenIndex].rank) {
          continue;
        }
        this._host.game.village.promoteKittens();
        return;
      }
    }
    autoPromoteLeader() {
      if (this._host.game.science.get("civil").researched && this._host.game.village.leader !== null) {
        const leader = this._host.game.village.leader;
        const rank = leader.rank;
        const gold = this._workshopManager.getResource("gold");
        const goldStock = this._workshopManager.getStock("gold");
        if (this._host.game.village.sim.goldToPromote(rank, rank + 1, gold.value - goldStock)[0] && this._host.game.village.sim.promote(leader, rank + 1) === 1) {
          this._host.engine.iactivity("act.promote", [rank + 1], "ks-promote");
          this._host.game.tabs[1].censusPanel.census.renderGovernment(
            this._host.game.tabs[1].censusPanel.census
          );
          this._host.game.tabs[1].censusPanel.census.update();
          this._host.engine.storeForSummary("promote", 1);
        }
      }
    }
    autoHunt(cacheManager) {
      const manpower = this._workshopManager.getResource("manpower");
      const trigger = this.settings.hunt.trigger ?? 0;
      if (manpower.value < 100 || this._host.game.challenges.isActive("pacifism")) {
        return;
      }
      if (trigger <= manpower.value / manpower.maxValue && 100 <= manpower.value) {
        const huntCount = Math.floor(manpower.value / 100);
        this._host.engine.storeForSummary("hunt", huntCount);
        this._host.engine.iactivity("act.hunt", [huntCount], "ks-hunt");
        const averageOutput = this._workshopManager.getAverageHunt();
        const trueOutput = {};
        for (const [out, outValue] of objectEntries(averageOutput)) {
          const res = this._workshopManager.getResource(out);
          trueOutput[out] = // If this is a capped resource...
          0 < res.maxValue ? (
            // multiply the amount of times we hunted with the result of an average hunt.
            // Capping at the max value and 0 bounds.
            Math.min(outValue * huntCount, Math.max(res.maxValue - res.value, 0))
          ) : (
            // Otherwise, just multiply unbounded
            outValue * huntCount
          );
        }
        if (!isNil(cacheManager)) {
          cacheManager.pushToCache({
            materials: trueOutput,
            timeStamp: this._host.game.timer.ticksTotal
          });
        }
        this._host.game.village.huntAll();
      }
    }
    autoFestival(cacheManager) {
      if (!this._host.game.science.get("drama").researched || 400 < this._host.game.calendar.festivalDays) {
        return;
      }
      if (!this._host.game.prestige.getPerk("carnivals").researched && 0 < this._host.game.calendar.festivalDays) {
        return;
      }
      const craftManager = this._workshopManager;
      if (craftManager.getValueAvailable("manpower") < 1500 || craftManager.getValueAvailable("culture") < 5e3 || craftManager.getValueAvailable("parchment") < 2500) {
        return;
      }
      const catpowProfitable = 4e3 * craftManager.getTickVal(
        craftManager.getResource("manpower"),
        cacheManager,
        true
      ) > 1500;
      const cultureProfitable = 4e3 * craftManager.getTickVal(
        craftManager.getResource("culture"),
        cacheManager,
        true
      ) > 5e3;
      const parchProfitable = 4e3 * craftManager.getTickVal(
        craftManager.getResource("parchment"),
        cacheManager,
        true
      ) > 2500;
      if (!catpowProfitable && !cultureProfitable && !parchProfitable) {
        return;
      }
      this.manager.render();
      if (this._host.game.villageTab.festivalBtn.model.enabled) {
        const beforeDays = this._host.game.calendar.festivalDays;
        this._host.game.villageTab.festivalBtn.onClick();
        this._host.engine.storeForSummary("festival");
        if (beforeDays > 0) {
          this._host.engine.iactivity("festival.extend", [], "ks-festival");
        } else {
          this._host.engine.iactivity("festival.hold", [], "ks-festival");
        }
      }
    }
  }
  const i18nData = { de, en, he, zh };
  class Engine {
    constructor(host, gameLanguage) {
      /**
       * All i18n literals of the userscript.
       */
      __publicField(this, "_i18nData");
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "bonfireManager");
      __publicField(this, "religionManager");
      __publicField(this, "scienceManager");
      __publicField(this, "spaceManager");
      __publicField(this, "timeControlManager");
      __publicField(this, "timeManager");
      __publicField(this, "tradeManager");
      __publicField(this, "villageManager");
      __publicField(this, "workshopManager");
      __publicField(this, "_activitySummary");
      __publicField(this, "_timeoutMainLoop");
      this.settings = new EngineSettings();
      this._i18nData = i18nData;
      this.setLanguage(gameLanguage, false);
      this._host = host;
      this._activitySummary = new ActivitySummary(this._host);
      this.workshopManager = new WorkshopManager(this._host);
      this.bonfireManager = new BonfireManager(this._host, this.workshopManager);
      this.religionManager = new ReligionManager(
        this._host,
        this.bonfireManager,
        this.workshopManager
      );
      this.scienceManager = new ScienceManager(this._host, this.workshopManager);
      this.spaceManager = new SpaceManager(this._host, this.workshopManager);
      this.timeControlManager = new TimeControlManager(
        this._host,
        this.bonfireManager,
        this.religionManager,
        this.spaceManager,
        this.workshopManager
      );
      this.timeManager = new TimeManager(this._host, this.workshopManager);
      this.tradeManager = new TradeManager(this._host, this.workshopManager);
      this.villageManager = new VillageManager(this._host, this.workshopManager);
    }
    isLanguageSupported(language) {
      return language in this._i18nData;
    }
    setLanguage(language, rebuildUI = true) {
      const previousLanguage = this.settings.language.selected;
      if (!this.isLanguageSupported(language)) {
        cwarn(
          `Requested language '${language}' is not available. Falling back to '${FallbackLanguage}'.`
        );
        this.settings.language.selected = FallbackLanguage;
      } else {
        cinfo(`Selecting language '${language}'.`);
        this.settings.language.selected = language;
      }
      if (previousLanguage !== this.settings.language.selected && rebuildUI) {
        this._host.rebuildUi();
      }
    }
    /**
     * Loads a new state into the engine.
     *
     * @param settings The engine state to load.
     * @param retainMetaBehavior When set to `true`, the engine will not be stopped or started, if the engine
     * state would require that. The settings for state management are also not loaded from the engine state.
     * This is intended to make loading of previous settings snapshots more intuitive.
     */
    stateLoad(settings, retainMetaBehavior = false) {
      this.stop(false);
      const version = ksVersion();
      if (settings.v !== version) {
        cwarn(
          `Attempting to load engine state with version tag '${settings.v}' when engine is at version '${version}'!`
        );
      }
      const attemptLoad = (loader, errorMessage) => {
        try {
          loader();
        } catch (error2) {
          cerror(`Failed load of ${errorMessage} settings.`, error2);
        }
      };
      attemptLoad(() => this.settings.load(settings.engine, retainMetaBehavior), "engine");
      attemptLoad(() => this.bonfireManager.settings.load(settings.bonfire), "bonfire");
      attemptLoad(() => this.religionManager.settings.load(settings.religion), "religion");
      attemptLoad(() => this.scienceManager.settings.load(settings.science), "science");
      attemptLoad(() => this.spaceManager.settings.load(settings.space), "space");
      attemptLoad(() => this.timeControlManager.settings.load(settings.timeControl), "time control");
      attemptLoad(() => this.timeManager.settings.load(settings.time), "time");
      attemptLoad(() => this.tradeManager.settings.load(settings.trade), "trade");
      attemptLoad(() => this.villageManager.settings.load(settings.village), "village");
      attemptLoad(() => this.workshopManager.settings.load(settings.workshop), "workshop");
      this.setLanguage(this.settings.language.selected);
      if (this.settings.enabled) {
        this.start(false);
      } else {
        this.stop(false);
      }
    }
    stateReset() {
      this.stateLoad({
        v: ksVersion(),
        engine: new EngineSettings(),
        bonfire: new BonfireSettings(),
        religion: new ReligionSettings(),
        science: new ScienceSettings(),
        space: new SpaceSettings(),
        timeControl: new TimeControlSettings(),
        time: new TimeSettings(),
        trade: new TradeSettings(),
        village: new VillageSettings(),
        workshop: new WorkshopSettings()
      });
    }
    /**
     * Serializes all settings in the engine.
     *
     * @returns A snapshot of the current engine settings state.
     */
    stateSerialize() {
      return {
        $schema: "https://schema.kitten-science.com/working-draft/settings-profile.schema.json",
        v: ksVersion(),
        engine: this.settings,
        bonfire: this.bonfireManager.settings,
        religion: this.religionManager.settings,
        science: this.scienceManager.settings,
        space: this.spaceManager.settings,
        timeControl: this.timeControlManager.settings,
        time: this.timeManager.settings,
        trade: this.tradeManager.settings,
        village: this.villageManager.settings,
        workshop: this.workshopManager.settings
      };
    }
    /**
     * Start the Kitten Scientists engine.
     *
     * @param msg Should we print to the log that the engine was started?
     */
    start(msg = true) {
      if (this._timeoutMainLoop) {
        return;
      }
      const loop = () => {
        const entry = Date.now();
        this._iterate().then(() => {
          const exit = Date.now();
          const timeTaken = exit - entry;
          if (this._timeoutMainLoop === void 0) {
            return;
          }
          this._timeoutMainLoop = window.setTimeout(
            loop,
            Math.max(10, this._host.engine.settings.interval - timeTaken)
          );
        }).catch((error2) => {
          cwarn(error2);
        });
      };
      this._timeoutMainLoop = window.setTimeout(loop, this._host.engine.settings.interval);
      if (msg) {
        this._host.engine.imessage("status.ks.enable");
      }
    }
    /**
     * Stop the Kitten Scientists engine.
     *
     * @param msg Should we print to the log that the engine was stopped?
     */
    stop(msg = true) {
      if (!this._timeoutMainLoop) {
        return;
      }
      clearTimeout(this._timeoutMainLoop);
      this._timeoutMainLoop = void 0;
      if (msg) {
        this._host.engine.imessage("status.ks.disable");
      }
    }
    /**
     * The main loop of the automation script.
     */
    async _iterate() {
      const context = { tick: (/* @__PURE__ */ new Date()).getTime() };
      if (this.settings.filters.disableKGLog.enabled) {
        this._maintainKGLogFilters();
      }
      await this.scienceManager.tick(context);
      this.bonfireManager.tick(context);
      this.spaceManager.tick(context);
      await this.workshopManager.tick(context);
      this.tradeManager.tick(context);
      await this.religionManager.tick(context);
      this.timeManager.tick(context);
      this.villageManager.tick(context);
      await this.timeControlManager.tick(context);
    }
    /**
     * Ensures all log filters in KG are unchecked. This means the events will not be logged.
     */
    _maintainKGLogFilters() {
      for (const filter of Object.values(this._host.game.console.filters)) {
        filter.enabled = false;
      }
      const filterCheckboxes = window.document.querySelectorAll("[id^=filter-]");
      for (const checkbox of filterCheckboxes) {
        checkbox.checked = false;
      }
    }
    /**
     * Retrieve an internationalized string literal.
     *
     * @param key The key to retrieve from the translation table.
     * @param args Variable arguments to render into the string.
     * @returns The translated string.
     */
    i18n(key, args = []) {
      let value;
      if (key.startsWith("$")) {
        value = this._host.i18nEngine(key.slice(1));
      }
      value = value ?? this._i18nData[this.settings.language.selected][key];
      if (typeof value === "undefined" || value === null) {
        value = i18nData[FallbackLanguage][key];
        if (!value) {
          cwarn(`i18n key '${key}' not found in default language.`);
          return `$${key}`;
        }
        cwarn(`i18n key '${key}' not found in selected language.`);
      }
      if (args) {
        for (let argIndex = 0; argIndex < args.length; ++argIndex) {
          value = value.replace(`{${argIndex}}`, `${args[argIndex]}`);
        }
      }
      return value;
    }
    iactivity(i18nLiteral, i18nArgs = [], logStyle) {
      const text = this.i18n(i18nLiteral, i18nArgs);
      if (logStyle) {
        const activityClass = `type_${logStyle}`;
        this._printOutput(`ks-activity ${activityClass}`, "#e65C00", text);
      } else {
        this._printOutput("ks-activity", "#e65C00", text);
      }
    }
    imessage(i18nLiteral, i18nArgs = []) {
      this._printOutput("ks-default", "#aa50fe", this.i18n(i18nLiteral, i18nArgs));
    }
    storeForSummary(name, amount = 1, section = "other") {
      this._activitySummary.storeActivity(name, amount, section);
    }
    getSummary() {
      return this._activitySummary.renderSummary();
    }
    displayActivitySummary() {
      const summary = this.getSummary();
      for (const summaryLine of summary) {
        this._printOutput("ks-summary", "#009933", summaryLine);
      }
      this.resetActivitySummary();
    }
    resetActivitySummary() {
      this._activitySummary.resetActivity();
    }
    _printOutput(cssClasses, color, ...args) {
      if (this.settings.filters.enabled) {
        for (const filterItem of Object.values(this.settings.filters.filters)) {
          if (filterItem.variant === cssClasses && !filterItem.enabled) {
            return;
          }
        }
      }
      const msg = this._host.game.msg(...args, cssClasses);
      $(msg.span).css("color", color);
      cdebug(...args);
    }
  }
  class TreeNode {
    /**
     * Construct tree node.
     * @param parent - The parent.
     */
    constructor(parent) {
      /**
       * The parent.
       */
      __privateAdd(this, _parent, void 0);
      /**
       * Our children.
       */
      __privateAdd(this, _children, /* @__PURE__ */ new Set());
      __privateSet(this, _parent, parent);
    }
    /**
     * The parent.
     * @returns The parent.
     */
    get parent() {
      return __privateGet(this, _parent);
    }
    /**
     * The children.
     * @returns The children.
     */
    get children() {
      return __privateGet(this, _children);
    }
    /**
     * Register a new child on the tree.
     * @param child - A new child.
     * @returns The child.
     */
    child(child) {
      this.children.add(child);
      return child;
    }
  }
  _parent = new WeakMap();
  _children = new WeakMap();
  class AbstractError extends Error {
    /**
     * Constructs a new {@linkcode AbstractError}.
     * @param code - The main identification code for the error.
     * @param message - The main error message.
     * @param status - The HTTP status code to return.
     */
    constructor(code2, message, status) {
      super(message);
      /**
       * The HTTP status code to associate with this error.
       */
      __publicField(this, "status");
      /**
       * An application-unique, readable error code.
       */
      __publicField(this, "code");
      this.code = code2;
      this.name = "AbstractError";
      this.status = status;
      if (typeof Error.captureStackTrace !== "undefined") {
        Error.captureStackTrace(this, AbstractError);
      }
    }
    /**
     * Checks if an object is an instance of {@linkcode AbstractError}, or one of its subclasses.
     * @param error - The object to check.
     * @param allowForeignModule - Only check for similar looking error codes.
     * You're going to want to use this if you're dealing with a setup where
     * multiple versions of js-utils are loaded.
     * @returns `true` if the object is an {@linkcode AbstractError}, `false` otherwise.
     */
    static isAbstractError(error2, allowForeignModule = true) {
      if (error2 instanceof AbstractError) {
        return true;
      }
      if (allowForeignModule) {
        const errorRecord = error2;
        if (Object(error2) === error2 && "code" in errorRecord && typeof errorRecord.code === "string") {
          const codedError = error2;
          if (codedError.code.match(/^ERR_OS_/)) {
            return true;
          }
        }
      }
      return false;
    }
  }
  class InvalidOperationError extends AbstractError {
    /**
     * Constructs a new {@linkcode InvalidOperationError}.
     * @param message - The main error message.
     * @param status - The HTTP status code to return.
     */
    constructor(message, status = 400) {
      super("ERR_OS_INVALID_OPERATION", message, status);
      this.name = "InvalidOperationError";
      if (typeof Error.captureStackTrace !== "undefined") {
        Error.captureStackTrace(this, InvalidOperationError);
      }
    }
  }
  class InternalError extends AbstractError {
    /**
     * Constructs a new {@linkcode InternalError}.
     * @param message - The main error message.
     * @param status - The HTTP status code to return.
     */
    constructor(message, status = 500) {
      super("ERR_OS_INTERNAL", message, status);
      this.name = "InternalError";
      if (typeof Error.captureStackTrace !== "undefined") {
        Error.captureStackTrace(this, InternalError);
      }
    }
    /**
     * Converts an error into an {@linkcode InternalError}.
     * @param error - The error to convert.
     * @returns An {@linkcode InternalError} that represents the given error.
     */
    static fromError(error2) {
      const internalError = new InternalError(error2.message);
      Object.assign(internalError, error2, new InternalError(error2.message));
      internalError.stack = error2.stack;
      return internalError;
    }
  }
  class UnknownError extends AbstractError {
    /**
     * Constructs a new {@linkcode UnknownError}.
     * @param message - The main error message.
     * @param status - The HTTP status code to return.
     */
    constructor(message, status = 500) {
      super("ERR_OS_UNKNOWN", message, status);
      this.name = "UnknownError";
      if (typeof Error.captureStackTrace !== "undefined") {
        Error.captureStackTrace(this, UnknownError);
      }
    }
  }
  const isError = (subject) => {
    return subject instanceof Error || Object.prototype.toString.call(subject) === "[object Error]";
  };
  const unknownToError = (subject) => {
    if (AbstractError.isAbstractError(subject)) {
      return subject;
    }
    if (isError(subject)) {
      return InternalError.fromError(subject);
    }
    return new UnknownError(String(subject));
  };
  const errorToRecord = (error2) => {
    const record = {};
    for (const propertyName of Object.getOwnPropertyNames(error2)) {
      record[propertyName] = error2[propertyName];
    }
    return record;
  };
  class Vector3 {
    /**
     * Constructs a new {@linkcode Vector3}.
     * @param x - The X component.
     * @param y - The Y component.
     * @param z - The Z component.
     */
    constructor(x = 0, y = 0, z = 0) {
      /**
       * The X component of the vector.
       */
      __publicField(this, "x");
      /**
       * The Y component of the vector.
       */
      __publicField(this, "y");
      /**
       * The Z component of the vector.
       */
      __publicField(this, "z");
      this.x = x;
      this.y = y;
      this.z = z;
    }
    /**
     * Creates a copy of another {@linkcode Vector3}.
     * @param vector - The vector to copy.
     * @returns A new vector.
     */
    static fromVector3(vector) {
      return new Vector3(vector.x, vector.y, vector.z);
    }
    /**
     * Sets the vector to new coordinates.
     * @param vector - The coordinates to set the vector to.
     * @returns This instance.
     */
    set(vector) {
      return this.setXYZ(vector.x, vector.y, vector.z);
    }
    /**
     * Sets the vector to new coordinates.
     * @param x - The new X component for the vector.
     * @param y - The new Y component for the vector.
     * @param z - The new Z component for the vector.
     * @returns This instance.
     */
    setXYZ(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
    /**
     * Adds another vector to this vector.
     * @param vector - The vector to add to this vector.
     * @returns This instance.
     */
    add(vector) {
      return this.addXYZ(vector.x, vector.y, vector.z);
    }
    /**
     * Adds another vector to this vector.
     * @param x - The value to add to the X component.
     * @param y - The value to add to the Y component.
     * @param z - The value to add to the Z component.
     * @returns This instance.
     */
    addXYZ(x, y, z) {
      this.x += x;
      this.y += y;
      this.z += z;
      return this;
    }
    /**
     * Scales another vector and adds it to this vector.
     * @param vector - The vector to add to this vector.
     * @param scale - The scaling to apply to the input vector.
     * @returns This instance.
     */
    addMultiply(vector, scale) {
      return this.addMultiplyXYZ(vector.x, vector.y, vector.z, scale);
    }
    /**
     * Scales another vector and adds it to this vector.
     * @param x - The value to add to the X component.
     * @param y - The value to add to the Y component.
     * @param z - The value to add to the Z component.
     * @param scale - The scaling to apply to the input vector.
     * @returns This instance.
     */
    addMultiplyXYZ(x, y, z, scale) {
      this.x += x * scale;
      this.y += y * scale;
      this.z += z * scale;
      return this;
    }
    /**
     * Subtracts another vector from this vector.
     * @param vector - The vector to subtract from this vector.
     * @returns This instance.
     */
    subtract(vector) {
      return this.subtractXYZ(vector.x, vector.y, vector.z);
    }
    /**
     * Subtracts another vector from this vector.
     * @param x - The value to subtract from the X component.
     * @param y - The value to subtract from the Y component.
     * @param z - The value to subtract from the Z component.
     * @returns This instance.
     */
    subtractXYZ(x, y, z) {
      this.x -= x;
      this.y -= y;
      this.z -= z;
      return this;
    }
    /**
     * Multiplies this vector by another vector.
     * @param vector - The vector to multiply with this vector.
     * @returns This instance.
     */
    multiply(vector) {
      return this.multiplyXYZ(vector.x, vector.y, vector.z);
    }
    /**
     * Multiplies this vector by another vector.
     * @param x - The value to multiply with the X component.
     * @param y - The value to multiply with the Y component.
     * @param z - The value to multiply with the Z component.
     * @returns This instance.
     */
    multiplyXYZ(x, y, z) {
      this.x *= x;
      this.y *= y;
      this.z *= z;
      return this;
    }
    /**
     * Multiplies the vector by the given scale.
     * @param scale - The scaling to apply to the vector.
     * @returns This instance.
     */
    multiplyScale(scale) {
      this.x *= scale;
      this.y *= scale;
      this.z *= scale;
      return this;
    }
    /**
     * Divides this vector by another vector.
     * @param vector - The vector to divide this vector with.
     * @returns This instance.
     */
    divide(vector) {
      return this.divideXYZ(vector.x, vector.y, vector.z);
    }
    /**
     * Divides this vector by another vector.
     * @param x - The value to divide the X component with.
     * @param y - The value to divide the Y component with.
     * @param z - The value to divide the Z component with.
     * @returns This instance.
     */
    divideXYZ(x, y, z) {
      this.x /= x;
      this.y /= y;
      this.z /= z;
      return this;
    }
    /**
     * Divides the vector by the given scale.
     * @param scale - The scaling to apply to the vector.
     * @returns This instance.
     */
    divideScale(scale) {
      this.x /= scale;
      this.y /= scale;
      this.z /= scale;
      return this;
    }
    /**
     * Inverts the direction of the vector.
     * @returns This instance.
     */
    invertAdd() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      return this;
    }
    /**
     * Inverts the vectors scale.
     * @returns This instance.
     */
    invertMultiply() {
      this.x = 1 / this.x;
      this.y = 1 / this.y;
      this.z = 1 / this.z;
      return this;
    }
    /**
     * Clamps the components of the vector at the given boundary.
     * @param floor - The lowest value to allow.
     * @param ceil - The largest value to allow.
     * @returns This instance.
     */
    clamp(floor, ceil) {
      if (this.x < floor) {
        this.x = floor;
      }
      if (this.x > ceil) {
        this.x = ceil;
      }
      if (this.y < floor) {
        this.y = floor;
      }
      if (this.y > ceil) {
        this.y = ceil;
      }
      if (this.z < floor) {
        this.z = floor;
      }
      if (this.z > ceil) {
        this.z = ceil;
      }
      return this;
    }
    /**
     * Calculates the length of the vector.
     * @returns The length of the vector.
     */
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    /**
     * Normalizes the vector.
     * @returns This instance.
     */
    normalize() {
      const length = this.length();
      if (length === 0) {
        return this;
      }
      this.x /= length;
      this.y /= length;
      this.z /= length;
      return this;
    }
    /**
     * Compares two vectors.
     * @param vector - The vector to compare this vector to.
     * @returns `true` if the vectors are idently, `false` otherwise.
     */
    compare(vector) {
      return vector.x === this.x && vector.y === this.y && vector.z === this.z;
    }
    /**
     * Linearly moves this vector towards a target vector.
     * @param vector - The target vector.
     * @param t - The location on the scale, from `0` to `1`.
     * @returns This instance.
     */
    lerp(vector, t2) {
      const tn = 1 - t2;
      this.x = this.x * tn + vector.x * t2;
      this.y = this.y * tn + vector.y * t2;
      this.z = this.z * tn + vector.z * t2;
      return this;
    }
    /**
     * Rotates the vector by the given rotation matrix.
     * @param matrix - The rotation matrix to apply to the vector.
     * @returns This instance.
     */
    rotate(matrix) {
      const xn = this.x;
      const yn = this.y;
      const zn = this.z;
      this.x = xn * matrix.m00 + yn * matrix.m10 + zn * matrix.m20;
      this.y = xn * matrix.m01 + yn * matrix.m11 + zn * matrix.m21;
      this.z = xn * matrix.m02 + yn * matrix.m12 + zn * matrix.m22;
      return this;
    }
    /**
     * Inversely rotates the vector by the given rotation matrix.
     * @param matrix - The rotation matrix to apply to the vector.
     * @returns This instance.
     */
    rotateInverse(matrix) {
      const xn = this.x;
      const yn = this.y;
      const zn = this.z;
      this.x = xn * matrix.m00 + yn * matrix.m01 + zn * matrix.m02;
      this.y = xn * matrix.m10 + yn * matrix.m11 + zn * matrix.m12;
      this.z = xn * matrix.m20 + yn * matrix.m21 + zn * matrix.m22;
      return this;
    }
    /**
     * Rotates the vector by the given rotation matrix around the given center.
     * @param center - The center around which to rotate the vector.
     * @param matrix - The rotation matrix to apply to the vector.
     * @returns This instance.
     */
    rotateAround(center, matrix) {
      const xn = this.x - center.x;
      const yn = this.y - center.y;
      const zn = this.z - center.z;
      this.x = xn * matrix.m00 + yn * matrix.m10 + zn * matrix.m20 + center.x;
      this.y = xn * matrix.m01 + yn * matrix.m11 + zn * matrix.m21 + center.y;
      this.z = xn * matrix.m02 + yn * matrix.m12 + zn * matrix.m22 + center.z;
      return this;
    }
    /**
     * Inversely rotates the vector by the given rotation matrix around the given center.
     * @param center - The center around which to rotate the vector.
     * @param matrix - The rotation matrix to apply to the vector.
     * @returns This instance.
     */
    rotateAroundInverse(center, matrix) {
      const xn = this.x - center.x;
      const yn = this.y - center.y;
      const zn = this.z - center.z;
      this.x = xn * matrix.m00 + yn * matrix.m01 + zn * matrix.m02 + center.x;
      this.y = xn * matrix.m10 + yn * matrix.m11 + zn * matrix.m12 + center.y;
      this.z = xn * matrix.m20 + yn * matrix.m21 + zn * matrix.m22 + center.z;
      return this;
    }
    /**
     * Transform the vector with a {@linkcode Transformation}.
     * @param transformation - The transformation to apply.
     * @returns This instance.
     */
    transform(transformation) {
      return this.multiply(transformation.scale).rotate(transformation.rotation).add(transformation.position);
    }
    /**
     * Inversely transform the vector with a {@linkcode Transformation}.
     * @param transformation - The transformation to apply.
     * @returns This instance.
     */
    transformInverse(transformation) {
      return this.subtract(transformation.position).rotateInverse(transformation.rotation).divide(transformation.scale);
    }
    /**
     * Returns the dot product between two vectors.
     * @param vector - The other vector.
     * @returns The dot product between the two vectors.
     */
    dot(vector) {
      return this.dotXYZ(vector.x, vector.y, vector.z);
    }
    /**
     * Returns the dot product between two vectors.
     * @param x - The X component of the other vector.
     * @param y - The Y component of the other vector.
     * @param z - The Z component of the other vector.
     * @returns The dot product between the two vectors.
     */
    dotXYZ(x, y, z) {
      return this.x * x + this.y * y + this.z * z;
    }
    /**
     * Calculates the dot product of this vector and another vector, and then
     * sets this vector to the result.
     * @param vector - The other vector.
     * @returns This instance.
     */
    cross(vector) {
      const xn = this.z * vector.y - this.y * vector.z;
      const yn = this.x * vector.z - this.z * vector.x;
      const zn = this.y * vector.x - this.x * vector.y;
      this.x = xn;
      this.y = yn;
      this.z = zn;
      return this;
    }
    /**
     * Makes this vector perpendicular to the other 3 vectors.
     * @param vector0 - The first vector.
     * @param vector1 - The second vector.
     * @param vector2 - The third vector.
     * @returns This instance.
     */
    perpendicular(vector0, vector1, vector2) {
      const px = vector2.x - vector1.x;
      const py = vector2.y - vector1.y;
      const pz = vector2.z - vector1.z;
      const qx = vector0.x - vector1.x;
      const qy = vector0.y - vector1.y;
      const qz = vector0.z - vector1.z;
      this.x = pz * qy - py * qz;
      this.y = px * qz - pz * qx;
      this.z = py * qx - px * qy;
      return this;
    }
    /**
     * Reflects this vector against the given normal and sets this vector to
     * the result.
     * @param normal - The normal against which to reflect.
     * @returns This instance.
     */
    reflect(normal) {
      const c = this.dot(normal) * 2;
      this.x = this.x - c * normal.x;
      this.y = this.y - c * normal.y;
      this.z = this.z - c * normal.z;
      return this;
    }
    /**
     * Calculates the reflection of this vector, based on the angle of incident
     * into a material with the given refractive index, according to Snell's law.
     * This vector is then set to the result.
     * @param normal - The normal against which to reflect.
     * @param index - The refractive index of the material.
     * @returns This instance.
     */
    fraction(normal, index) {
      let c = -this.dot(normal);
      const r = 1 + index * index * (c * c - 1);
      if (r < 0)
        return this.reflect(normal);
      c = index * c - Math.sqrt(r);
      this.x = index * this.x + c * normal.x;
      this.y = index * this.y + c * normal.y;
      this.z = index * this.z + c * normal.z;
      return this;
    }
    /**
     * Return the components of this vector as an array.
     * @returns The components of this vector as an array.
     */
    asArray() {
      return [this.x, this.y, this.z];
    }
  }
  class Random {
    /**
     * Creates a pseudo-random value generator. The seed must be an integer.
     *
     * Uses an optimized version of the Park-Miller PRNG.
     * http://www.firstpr.com.au/dsp/rand31/
     * @param seed - The seed for the random number generator.
     */
    constructor(seed = 0) {
      /**
       * The value this PRNG was seeded with.
       */
      __publicField(this, "_seed");
      /**
       * The permutation table for simplex noise.
       */
      __publicField(this, "_perm");
      /**
       * The gradient map for simplex noise.
       */
      __publicField(this, "_gradP");
      /**
       * Skewing and unskewing factors for 2, 3, and 4 dimensions.
       */
      __publicField(this, "_F2");
      /**
       * Skewing and unskewing factors for 2, 3, and 4 dimensions.
       */
      __publicField(this, "_G2");
      this._seed = Math.trunc(seed) % 2147483647;
      if (this._seed <= 0) {
        this._seed += 2147483646;
      }
      const grad3 = [
        new Vector3(1, 1, 0),
        new Vector3(-1, 1, 0),
        new Vector3(1, -1, 0),
        new Vector3(-1, -1, 0),
        new Vector3(1, 0, 1),
        new Vector3(-1, 0, 1),
        new Vector3(1, 0, -1),
        new Vector3(-1, 0, -1),
        new Vector3(0, 1, 1),
        new Vector3(0, -1, 1),
        new Vector3(0, 1, -1),
        new Vector3(0, -1, -1)
      ];
      const p = [
        151,
        160,
        137,
        91,
        90,
        15,
        131,
        13,
        201,
        95,
        96,
        53,
        194,
        233,
        7,
        225,
        140,
        36,
        103,
        30,
        69,
        142,
        8,
        99,
        37,
        240,
        21,
        10,
        23,
        190,
        6,
        148,
        247,
        120,
        234,
        75,
        0,
        26,
        197,
        62,
        94,
        252,
        219,
        203,
        117,
        35,
        11,
        32,
        57,
        177,
        33,
        88,
        237,
        149,
        56,
        87,
        174,
        20,
        125,
        136,
        171,
        168,
        68,
        175,
        74,
        165,
        71,
        134,
        139,
        48,
        27,
        166,
        77,
        146,
        158,
        231,
        83,
        111,
        229,
        122,
        60,
        211,
        133,
        230,
        220,
        105,
        92,
        41,
        55,
        46,
        245,
        40,
        244,
        102,
        143,
        54,
        65,
        25,
        63,
        161,
        1,
        216,
        80,
        73,
        209,
        76,
        132,
        187,
        208,
        89,
        18,
        169,
        200,
        196,
        135,
        130,
        116,
        188,
        159,
        86,
        164,
        100,
        109,
        198,
        173,
        186,
        3,
        64,
        52,
        217,
        226,
        250,
        124,
        123,
        5,
        202,
        38,
        147,
        118,
        126,
        255,
        82,
        85,
        212,
        207,
        206,
        59,
        227,
        47,
        16,
        58,
        17,
        182,
        189,
        28,
        42,
        223,
        183,
        170,
        213,
        119,
        248,
        152,
        2,
        44,
        154,
        163,
        70,
        221,
        153,
        101,
        155,
        167,
        43,
        172,
        9,
        129,
        22,
        39,
        253,
        19,
        98,
        108,
        110,
        79,
        113,
        224,
        232,
        178,
        185,
        112,
        104,
        218,
        246,
        97,
        228,
        251,
        34,
        242,
        193,
        238,
        210,
        144,
        12,
        191,
        179,
        162,
        241,
        81,
        51,
        145,
        235,
        249,
        14,
        239,
        107,
        49,
        192,
        214,
        31,
        181,
        199,
        106,
        157,
        184,
        84,
        204,
        176,
        115,
        121,
        50,
        45,
        127,
        4,
        150,
        254,
        138,
        236,
        205,
        93,
        222,
        114,
        67,
        29,
        24,
        72,
        243,
        141,
        128,
        195,
        78,
        66,
        215,
        61,
        156,
        180
      ];
      this._perm = new Array(512);
      this._gradP = new Array(512);
      for (let i = 0; i < 256; i++) {
        let v;
        if (i & 1) {
          v = p[i] ^ this._seed & 255;
        } else {
          v = p[i] ^ this._seed >> 8 & 255;
        }
        this._perm[i] = this._perm[i + 256] = v;
        this._gradP[i] = this._gradP[i + 256] = grad3[v % 12];
      }
      this._F2 = 0.5 * (Math.sqrt(3) - 1);
      this._G2 = (3 - Math.sqrt(3)) / 6;
    }
    /**
     * Retrieve the seed of the PRNG.
     * @returns The seed of the PRNG.
     */
    get seed() {
      return this._seed;
    }
    /**
     * Returns a pseudo-random value between 1 and 2^32 - 2.
     * @returns A pseudo-random value between 1 and 2^32 - 2.
     */
    next() {
      return this._seed = this._seed * 16807 % 2147483647;
    }
    /**
     * Returns a random value in a given range.
     * @param min - The lower bound.
     * @param max - The upper bound.
     * @returns A random value between the lower and upper bound.
     */
    nextRange(min, max) {
      return this.nextFloat() * (max - min) + min;
    }
    /**
     * Returns either `true` or `false`.
     * @returns Either `true` or `false`.
     */
    nextBoolean() {
      return this.next() < 2147483646 / 2;
    }
    /**
     * Returns a pseudo-random floating point number in range [0, 1).
     * @returns a pseudo-random floating point number in range [0, 1).
     */
    nextFloat() {
      return (this.next() - 1) / 2147483646;
    }
    /**
     * Creates a new Random instance, with a seed that is based of the seed
     * of this Random instance.
     * @returns A new random number generator.
     */
    nextRandom() {
      return new Random(this.seed + 1);
    }
    /**
     * Returns a 2D simplex noise value for a given input coordinate.
     * @param x - The X input coordinate.
     * @param y - The Y input coordinate.
     * @returns The noise value for the input coordinates.
     */
    simplex2(x, y) {
      let n0, n1, n2;
      const s = (x + y) * this._F2;
      let i = Math.floor(x + s);
      let j = Math.floor(y + s);
      const t2 = (i + j) * this._G2;
      const x0 = x - i + t2;
      const y0 = y - j + t2;
      let i1, j1;
      if (x0 > y0) {
        i1 = 1;
        j1 = 0;
      } else {
        i1 = 0;
        j1 = 1;
      }
      const x1 = x0 - i1 + this._G2;
      const y1 = y0 - j1 + this._G2;
      const x2 = x0 - 1 + 2 * this._G2;
      const y2 = y0 - 1 + 2 * this._G2;
      i &= 255;
      j &= 255;
      const gi0 = this._gradP[i + this._perm[j]];
      const gi1 = this._gradP[i + i1 + this._perm[j + j1]];
      const gi2 = this._gradP[i + 1 + this._perm[j + 1]];
      let t0 = 0.5 - x0 * x0 - y0 * y0;
      if (t0 < 0) {
        n0 = 0;
      } else {
        t0 *= t0;
        n0 = t0 * t0 * gi0.dotXYZ(x0, y0, 0);
      }
      let t1 = 0.5 - x1 * x1 - y1 * y1;
      if (t1 < 0) {
        n1 = 0;
      } else {
        t1 *= t1;
        n1 = t1 * t1 * gi1.dotXYZ(x1, y1, 0);
      }
      let t22 = 0.5 - x2 * x2 - y2 * y2;
      if (t22 < 0) {
        n2 = 0;
      } else {
        t22 *= t22;
        n2 = t22 * t22 * gi2.dotXYZ(x2, y2, 0);
      }
      return 70 * (n0 + n1 + n2);
    }
    /**
     * Returns a 3D simplex noise value for a given input coordinate.
     * @param x - The X input coordinate.
     * @param y - The Y input coordinate.
     * @param z - The Z input coordinate.
     * @returns The noise value for the input coordinates.
     */
    simplex3(x, y, z) {
      const F3 = 1 / 3;
      const G3 = 1 / 6;
      let n0, n1, n2, n3;
      const s = (x + y + z) * F3;
      let i = Math.floor(x + s);
      let j = Math.floor(y + s);
      let k = Math.floor(z + s);
      const t2 = (i + j + k) * G3;
      const x0 = x - i + t2;
      const y0 = y - j + t2;
      const z0 = z - k + t2;
      let i1, j1, k1;
      let i2, j2, k2;
      if (x0 >= y0) {
        if (y0 >= z0) {
          i1 = 1;
          j1 = 0;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        } else if (x0 >= z0) {
          i1 = 1;
          j1 = 0;
          k1 = 0;
          i2 = 1;
          j2 = 0;
          k2 = 1;
        } else {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 1;
          j2 = 0;
          k2 = 1;
        }
      } else {
        if (y0 < z0) {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } else if (x0 < z0) {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } else {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        }
      }
      const x1 = x0 - i1 + G3;
      const y1 = y0 - j1 + G3;
      const z1 = z0 - k1 + G3;
      const x2 = x0 - i2 + 2 * G3;
      const y2 = y0 - j2 + 2 * G3;
      const z2 = z0 - k2 + 2 * G3;
      const x3 = x0 - 1 + 3 * G3;
      const y3 = y0 - 1 + 3 * G3;
      const z3 = z0 - 1 + 3 * G3;
      i &= 255;
      j &= 255;
      k &= 255;
      const gi0 = this._gradP[i + this._perm[j + this._perm[k]]];
      const gi1 = this._gradP[i + i1 + this._perm[j + j1 + this._perm[k + k1]]];
      const gi2 = this._gradP[i + i2 + this._perm[j + j2 + this._perm[k + k2]]];
      const gi3 = this._gradP[i + 1 + this._perm[j + 1 + this._perm[k + 1]]];
      let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
      if (t0 < 0) {
        n0 = 0;
      } else {
        t0 *= t0;
        n0 = t0 * t0 * gi0.dotXYZ(x0, y0, z0);
      }
      let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
      if (t1 < 0) {
        n1 = 0;
      } else {
        t1 *= t1;
        n1 = t1 * t1 * gi1.dotXYZ(x1, y1, z1);
      }
      let t22 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
      if (t22 < 0) {
        n2 = 0;
      } else {
        t22 *= t22;
        n2 = t22 * t22 * gi2.dotXYZ(x2, y2, z2);
      }
      let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
      if (t3 < 0) {
        n3 = 0;
      } else {
        t3 *= t3;
        n3 = t3 * t3 * gi3.dotXYZ(x3, y3, z3);
      }
      return 32 * (n0 + n1 + n2 + n3);
    }
  }
  new Random();
  const css = (input) => input.join("");
  css`
  html,
  body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: #808080;
  }

  body {
    display: block !important;
    transition: background-color 1s ease-in-out;
  }
  body.darkMode {
    background-color: #211f1f;

    .credits a {
      color: #a0a0a0;
    }
  }
  body.lightMode {
    background-color: #e6e6e6;

    .credits a {
      color: #606060;
    }
  }

  #main {
    display: block;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    filter: drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.5));
    transition: all 1s;
  }

  .credits {
    display: block;
    font-family: sans-serif;
    font-size: 10pt;
    color: #808080;
    position: absolute;
    top: 80%;
    text-align: center;
    user-select: none;
    width: 100%;
  }
`;
  const indent = (subject, depth = 0, prefix = "    ") => subject.replaceAll(/^/gm, prefix.repeat(depth));
  const hashCyrb53 = (subject, seed = 0) => {
    let h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
    for (let i = 0, ch; i < subject.length; i++) {
      ch = subject.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
    h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
    h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
    return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
  };
  const makeLogOrigin = (origin) => origin.includes("\n") ? hashCyrb53(origin) : origin;
  class Report extends TreeNode {
    /**
     * Constructs a new report.
     * @param origin - The ID of this report.
     * @param parent - The paren report for this report.
     * @throws {@linkcode InvalidOperationError} When the origin was already
     * used by another report in this hierarchy.
     */
    constructor(origin, parent) {
      super(parent);
      /**
       * Retrieves an entry of the store for the given origin.
       * @param origin - The origin of the entry.
       * @returns The store entry with that origin.
       */
      __privateAdd(this, _getStoreEntry);
      /**
       * The ID of this report.
       */
      __publicField(this, "origin");
      /**
       * Our storage for all logged messages.
       */
      __privateAdd(this, _store, /* @__PURE__ */ new Map());
      if (this.store.has(origin)) {
        throw new InvalidOperationError(`The origin '${origin}' was already used in this report.`);
      }
      this.origin = origin;
    }
    /**
     * Retrieve the message store.
     * @returns The message store.
     */
    get store() {
      var _a;
      return ((_a = this.parent) == null ? void 0 : _a.store) ?? __privateGet(this, _store);
    }
    /**
     * Put an entry into the report.
     * @param message - The message to add.
     * @param context - An arbitrary key-value object to store with the message.
     */
    log(message, context) {
      var _a;
      (_a = __privateMethod(this, _getStoreEntry, getStoreEntry_fn).call(this, makeLogOrigin(this.origin))) == null ? void 0 : _a.push({ message, context });
    }
    /**
     * Prints the contents of the report.
     * @param logger - A logger to use to print the report.
     * @param depth - How deep to indent this part of the report.
     */
    aggregate(logger, depth = 0) {
      for (const [origin, records] of __privateGet(this, _store).entries()) {
        if (origin !== this.origin) {
          continue;
        }
        logger.log(indent(`${origin}`, depth));
        for (const entry of records) {
          logger.log(indent(` - ${entry.message}`, depth));
          if (entry.context) {
            logger.log(indent(JSON.stringify(entry.context, void 0, depth + 4), depth));
          }
        }
      }
      if (this.children.size === 0) {
        return;
      }
      for (const child of this.children) {
        child.aggregate(logger, depth + 1);
      }
    }
  }
  _store = new WeakMap();
  _getStoreEntry = new WeakSet();
  getStoreEntry_fn = function(origin) {
    if (!__privateGet(this, _store).has(origin)) {
      __privateGet(this, _store).set(origin, new Array());
    }
    return __privateGet(this, _store).get(origin);
  };
  var ajv = { exports: {} };
  var core$2 = {};
  var validate = {};
  var boolSchema = {};
  var errors = {};
  var codegen = {};
  var code$1 = {};
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
    class _CodeOrName {
    }
    exports._CodeOrName = _CodeOrName;
    exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class Name extends _CodeOrName {
      constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return false;
      }
      get names() {
        return { [this.str]: 1 };
      }
    }
    exports.Name = Name;
    class _Code extends _CodeOrName {
      constructor(code2) {
        super();
        this._items = typeof code2 === "string" ? [code2] : code2;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return false;
        const item = this._items[0];
        return item === "" || item === '""';
      }
      get str() {
        var _a;
        return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
      }
      get names() {
        var _a;
        return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names2, c) => {
          if (c instanceof Name)
            names2[c.str] = (names2[c.str] || 0) + 1;
          return names2;
        }, {});
      }
    }
    exports._Code = _Code;
    exports.nil = new _Code("");
    function _(strs, ...args) {
      const code2 = [strs[0]];
      let i = 0;
      while (i < args.length) {
        addCodeArg(code2, args[i]);
        code2.push(strs[++i]);
      }
      return new _Code(code2);
    }
    exports._ = _;
    const plus = new _Code("+");
    function str(strs, ...args) {
      const expr = [safeStringify(strs[0])];
      let i = 0;
      while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
      }
      optimize(expr);
      return new _Code(expr);
    }
    exports.str = str;
    function addCodeArg(code2, arg) {
      if (arg instanceof _Code)
        code2.push(...arg._items);
      else if (arg instanceof Name)
        code2.push(arg);
      else
        code2.push(interpolate(arg));
    }
    exports.addCodeArg = addCodeArg;
    function optimize(expr) {
      let i = 1;
      while (i < expr.length - 1) {
        if (expr[i] === plus) {
          const res = mergeExprItems(expr[i - 1], expr[i + 1]);
          if (res !== void 0) {
            expr.splice(i - 1, 3, res);
            continue;
          }
          expr[i++] = "+";
        }
        i++;
      }
    }
    function mergeExprItems(a, b) {
      if (b === '""')
        return a;
      if (a === '""')
        return b;
      if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
          return;
        if (typeof b != "string")
          return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
          return a.slice(0, -1) + b.slice(1);
        return;
      }
      if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
      return;
    }
    function strConcat(c1, c2) {
      return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
    }
    exports.strConcat = strConcat;
    function interpolate(x) {
      return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    function stringify(x) {
      return new _Code(safeStringify(x));
    }
    exports.stringify = stringify;
    function safeStringify(x) {
      return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    exports.safeStringify = safeStringify;
    function getProperty(key) {
      return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
    }
    exports.getProperty = getProperty;
    function getEsmExportName(key) {
      if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
      }
      throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
    }
    exports.getEsmExportName = getEsmExportName;
    function regexpCode(rx) {
      return new _Code(rx.toString());
    }
    exports.regexpCode = regexpCode;
  })(code$1);
  var scope = {};
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
    const code_12 = code$1;
    class ValueError extends Error {
      constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
      }
    }
    var UsedValueState;
    (function(UsedValueState2) {
      UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
      UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
    })(UsedValueState = exports.UsedValueState || (exports.UsedValueState = {}));
    exports.varKinds = {
      const: new code_12.Name("const"),
      let: new code_12.Name("let"),
      var: new code_12.Name("var")
    };
    class Scope {
      constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
      }
      toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_12.Name ? nameOrPrefix : this.name(nameOrPrefix);
      }
      name(prefix) {
        return new code_12.Name(this._newName(prefix));
      }
      _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
      }
      _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
          throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return this._names[prefix] = { prefix, index: 0 };
      }
    }
    exports.Scope = Scope;
    class ValueScopeName extends code_12.Name {
      constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
      }
      setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_12._)`.${new code_12.Name(property)}[${itemIndex}]`;
      }
    }
    exports.ValueScopeName = ValueScopeName;
    const line = (0, code_12._)`\n`;
    class ValueScope extends Scope {
      constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_12.nil };
      }
      get() {
        return this._scope;
      }
      name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
      }
      value(nameOrPrefix, value) {
        var _a;
        if (value.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
          const _name = vs.get(valueKey);
          if (_name)
            return _name;
        } else {
          vs = this._values[prefix] = /* @__PURE__ */ new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
      }
      getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
          return;
        return vs.get(keyOrRef);
      }
      scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
          if (name.scopePath === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return (0, code_12._)`${scopeName}${name.scopePath}`;
        });
      }
      scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
          if (name.value === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return name.value.code;
        }, usedValues, getCode);
      }
      _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code2 = code_12.nil;
        for (const prefix in values) {
          const vs = values[prefix];
          if (!vs)
            continue;
          const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
          vs.forEach((name) => {
            if (nameSet.has(name))
              return;
            nameSet.set(name, UsedValueState.Started);
            let c = valueCode(name);
            if (c) {
              const def2 = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
              code2 = (0, code_12._)`${code2}${def2} ${name} = ${c};${this.opts._n}`;
            } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
              code2 = (0, code_12._)`${code2}${c}${this.opts._n}`;
            } else {
              throw new ValueError(name);
            }
            nameSet.set(name, UsedValueState.Completed);
          });
        }
        return code2;
      }
    }
    exports.ValueScope = ValueScope;
  })(scope);
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
    const code_12 = code$1;
    const scope_1 = scope;
    var code_2 = code$1;
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return code_2._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return code_2.str;
    } });
    Object.defineProperty(exports, "strConcat", { enumerable: true, get: function() {
      return code_2.strConcat;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return code_2.nil;
    } });
    Object.defineProperty(exports, "getProperty", { enumerable: true, get: function() {
      return code_2.getProperty;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return code_2.stringify;
    } });
    Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function() {
      return code_2.regexpCode;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return code_2.Name;
    } });
    var scope_2 = scope;
    Object.defineProperty(exports, "Scope", { enumerable: true, get: function() {
      return scope_2.Scope;
    } });
    Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function() {
      return scope_2.ValueScope;
    } });
    Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function() {
      return scope_2.ValueScopeName;
    } });
    Object.defineProperty(exports, "varKinds", { enumerable: true, get: function() {
      return scope_2.varKinds;
    } });
    exports.operators = {
      GT: new code_12._Code(">"),
      GTE: new code_12._Code(">="),
      LT: new code_12._Code("<"),
      LTE: new code_12._Code("<="),
      EQ: new code_12._Code("==="),
      NEQ: new code_12._Code("!=="),
      NOT: new code_12._Code("!"),
      OR: new code_12._Code("||"),
      AND: new code_12._Code("&&"),
      ADD: new code_12._Code("+")
    };
    class Node {
      optimizeNodes() {
        return this;
      }
      optimizeNames(_names, _constants) {
        return this;
      }
    }
    class Def extends Node {
      constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
      }
      render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
      }
      optimizeNames(names2, constants2) {
        if (!names2[this.name.str])
          return;
        if (this.rhs)
          this.rhs = optimizeExpr(this.rhs, names2, constants2);
        return this;
      }
      get names() {
        return this.rhs instanceof code_12._CodeOrName ? this.rhs.names : {};
      }
    }
    class Assign extends Node {
      constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
      }
      render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
      }
      optimizeNames(names2, constants2) {
        if (this.lhs instanceof code_12.Name && !names2[this.lhs.str] && !this.sideEffects)
          return;
        this.rhs = optimizeExpr(this.rhs, names2, constants2);
        return this;
      }
      get names() {
        const names2 = this.lhs instanceof code_12.Name ? {} : { ...this.lhs.names };
        return addExprNames(names2, this.rhs);
      }
    }
    class AssignOp extends Assign {
      constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
      }
      render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
      }
    }
    class Label extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        return `${this.label}:` + _n;
      }
    }
    class Break extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
      }
    }
    class Throw extends Node {
      constructor(error2) {
        super();
        this.error = error2;
      }
      render({ _n }) {
        return `throw ${this.error};` + _n;
      }
      get names() {
        return this.error.names;
      }
    }
    class AnyCode extends Node {
      constructor(code2) {
        super();
        this.code = code2;
      }
      render({ _n }) {
        return `${this.code};` + _n;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(names2, constants2) {
        this.code = optimizeExpr(this.code, names2, constants2);
        return this;
      }
      get names() {
        return this.code instanceof code_12._CodeOrName ? this.code.names : {};
      }
    }
    class ParentNode extends Node {
      constructor(nodes = []) {
        super();
        this.nodes = nodes;
      }
      render(opts) {
        return this.nodes.reduce((code2, n) => code2 + n.render(opts), "");
      }
      optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i].optimizeNodes();
          if (Array.isArray(n))
            nodes.splice(i, 1, ...n);
          else if (n)
            nodes[i] = n;
          else
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      optimizeNames(names2, constants2) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i];
          if (n.optimizeNames(names2, constants2))
            continue;
          subtractNames(names2, n.names);
          nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((names2, n) => addNames(names2, n.names), {});
      }
    }
    class BlockNode extends ParentNode {
      render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
      }
    }
    class Root extends ParentNode {
    }
    class Else extends BlockNode {
    }
    Else.kind = "else";
    class If extends BlockNode {
      constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
      }
      render(opts) {
        let code2 = `if(${this.condition})` + super.render(opts);
        if (this.else)
          code2 += "else " + this.else.render(opts);
        return code2;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
          return this.nodes;
        let e = this.else;
        if (e) {
          const ns = e.optimizeNodes();
          e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
          if (cond === false)
            return e instanceof If ? e : e.nodes;
          if (this.nodes.length)
            return this;
          return new If(not2(cond), e instanceof If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
          return void 0;
        return this;
      }
      optimizeNames(names2, constants2) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
        if (!(super.optimizeNames(names2, constants2) || this.else))
          return;
        this.condition = optimizeExpr(this.condition, names2, constants2);
        return this;
      }
      get names() {
        const names2 = super.names;
        addExprNames(names2, this.condition);
        if (this.else)
          addNames(names2, this.else.names);
        return names2;
      }
    }
    If.kind = "if";
    class For extends BlockNode {
    }
    For.kind = "for";
    class ForLoop extends For {
      constructor(iteration) {
        super();
        this.iteration = iteration;
      }
      render(opts) {
        return `for(${this.iteration})` + super.render(opts);
      }
      optimizeNames(names2, constants2) {
        if (!super.optimizeNames(names2, constants2))
          return;
        this.iteration = optimizeExpr(this.iteration, names2, constants2);
        return this;
      }
      get names() {
        return addNames(super.names, this.iteration.names);
      }
    }
    class ForRange extends For {
      constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
      }
      render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
      }
      get names() {
        const names2 = addExprNames(super.names, this.from);
        return addExprNames(names2, this.to);
      }
    }
    class ForIter extends For {
      constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
      }
      render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
      }
      optimizeNames(names2, constants2) {
        if (!super.optimizeNames(names2, constants2))
          return;
        this.iterable = optimizeExpr(this.iterable, names2, constants2);
        return this;
      }
      get names() {
        return addNames(super.names, this.iterable.names);
      }
    }
    class Func extends BlockNode {
      constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
      }
      render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
      }
    }
    Func.kind = "func";
    class Return extends ParentNode {
      render(opts) {
        return "return " + super.render(opts);
      }
    }
    Return.kind = "return";
    class Try extends BlockNode {
      render(opts) {
        let code2 = "try" + super.render(opts);
        if (this.catch)
          code2 += this.catch.render(opts);
        if (this.finally)
          code2 += this.finally.render(opts);
        return code2;
      }
      optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
      }
      optimizeNames(names2, constants2) {
        var _a, _b;
        super.optimizeNames(names2, constants2);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names2, constants2);
        return this;
      }
      get names() {
        const names2 = super.names;
        if (this.catch)
          addNames(names2, this.catch.names);
        if (this.finally)
          addNames(names2, this.finally.names);
        return names2;
      }
    }
    class Catch extends BlockNode {
      constructor(error2) {
        super();
        this.error = error2;
      }
      render(opts) {
        return `catch(${this.error})` + super.render(opts);
      }
    }
    Catch.kind = "catch";
    class Finally extends BlockNode {
      render(opts) {
        return "finally" + super.render(opts);
      }
    }
    Finally.kind = "finally";
    class CodeGen {
      constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(prefix) {
        return this._scope.name(prefix);
      }
      // reserves unique name in the external scope
      scopeName(prefix) {
        return this._extScope.name(prefix);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
        vs.add(name);
        return name;
      }
      getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== void 0 && constant)
          this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
      }
      // `const` declaration (`var` in es5 mode)
      const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
      }
      // `var` declaration with optional assignment
      var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
      }
      // assignment code
      assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
      }
      // `+=` code
      add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
      }
      // appends passed SafeExpr to code or executes Block
      code(c) {
        if (typeof c == "function")
          c();
        else if (c !== code_12.nil)
          this._leafNode(new AnyCode(c));
        return this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...keyValues) {
        const code2 = ["{"];
        for (const [key, value] of keyValues) {
          if (code2.length > 1)
            code2.push(",");
          code2.push(key);
          if (key !== value || this.opts.es5) {
            code2.push(":");
            (0, code_12.addCodeArg)(code2, value);
          }
        }
        code2.push("}");
        return new code_12._Code(code2);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
          this.code(thenBody).else().code(elseBody).endIf();
        } else if (thenBody) {
          this.code(thenBody).endIf();
        } else if (elseBody) {
          throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(condition) {
        return this._elseNode(new If(condition));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new Else());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(If, Else);
      }
      _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
          this.code(forBody).endFor();
        return this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
      }
      // `for` statement for a range of values
      forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
          const arr = iterable instanceof code_12.Name ? iterable : this.var("_arr", iterable);
          return this.forRange("_i", 0, (0, code_12._)`${arr}.length`, (i) => {
            this.var(name, (0, code_12._)`${arr}[${i}]`);
            forBody(name);
          });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
          return this.forOf(nameOrPrefix, (0, code_12._)`Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(For);
      }
      // `label` statement
      label(label) {
        return this._leafNode(new Label(label));
      }
      // `break` statement
      break(label) {
        return this._leafNode(new Break(label));
      }
      // `return` statement
      return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
      }
      // `try` statement
      try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
          const error2 = this.name("e");
          this._currNode = node.catch = new Catch(error2);
          catchCode(error2);
        }
        if (finallyCode) {
          this._currNode = node.finally = new Finally();
          this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
      }
      // `throw` statement
      throw(error2) {
        return this._leafNode(new Throw(error2));
      }
      // start self-balancing block
      block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
          this.code(body).endBlock(nodeCount);
        return this;
      }
      // end the current self-balancing block
      endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
          throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(name, args = code_12.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
          this.code(funcBody).endFunc();
        return this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(Func);
      }
      optimize(n = 1) {
        while (n-- > 0) {
          this._root.optimizeNodes();
          this._root.optimizeNames(this._root.names, this._constants);
        }
      }
      _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
      }
      _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
      }
      _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2) {
          this._nodes.pop();
          return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
      }
      _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
          throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
      }
      set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
      }
    }
    exports.CodeGen = CodeGen;
    function addNames(names2, from) {
      for (const n in from)
        names2[n] = (names2[n] || 0) + (from[n] || 0);
      return names2;
    }
    function addExprNames(names2, from) {
      return from instanceof code_12._CodeOrName ? addNames(names2, from.names) : names2;
    }
    function optimizeExpr(expr, names2, constants2) {
      if (expr instanceof code_12.Name)
        return replaceName(expr);
      if (!canOptimize(expr))
        return expr;
      return new code_12._Code(expr._items.reduce((items2, c) => {
        if (c instanceof code_12.Name)
          c = replaceName(c);
        if (c instanceof code_12._Code)
          items2.push(...c._items);
        else
          items2.push(c);
        return items2;
      }, []));
      function replaceName(n) {
        const c = constants2[n.str];
        if (c === void 0 || names2[n.str] !== 1)
          return n;
        delete names2[n.str];
        return c;
      }
      function canOptimize(e) {
        return e instanceof code_12._Code && e._items.some((c) => c instanceof code_12.Name && names2[c.str] === 1 && constants2[c.str] !== void 0);
      }
    }
    function subtractNames(names2, from) {
      for (const n in from)
        names2[n] = (names2[n] || 0) - (from[n] || 0);
    }
    function not2(x) {
      return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_12._)`!${par(x)}`;
    }
    exports.not = not2;
    const andCode = mappend(exports.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    exports.and = and;
    const orCode = mappend(exports.operators.OR);
    function or(...args) {
      return args.reduce(orCode);
    }
    exports.or = or;
    function mappend(op) {
      return (x, y) => x === code_12.nil ? y : y === code_12.nil ? x : (0, code_12._)`${par(x)} ${op} ${par(y)}`;
    }
    function par(x) {
      return x instanceof code_12.Name ? x : (0, code_12._)`(${x})`;
    }
  })(codegen);
  var util = {};
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
    const codegen_12 = codegen;
    const code_12 = code$1;
    function toHash(arr) {
      const hash = {};
      for (const item of arr)
        hash[item] = true;
      return hash;
    }
    exports.toHash = toHash;
    function alwaysValidSchema(it, schema) {
      if (typeof schema == "boolean")
        return schema;
      if (Object.keys(schema).length === 0)
        return true;
      checkUnknownRules(it, schema);
      return !schemaHasRules(schema, it.self.RULES.all);
    }
    exports.alwaysValidSchema = alwaysValidSchema;
    function checkUnknownRules(it, schema = it.schema) {
      const { opts, self: self2 } = it;
      if (!opts.strictSchema)
        return;
      if (typeof schema === "boolean")
        return;
      const rules2 = self2.RULES.keywords;
      for (const key in schema) {
        if (!rules2[key])
          checkStrictMode(it, `unknown keyword: "${key}"`);
      }
    }
    exports.checkUnknownRules = checkUnknownRules;
    function schemaHasRules(schema, rules2) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (rules2[key])
          return true;
      return false;
    }
    exports.schemaHasRules = schemaHasRules;
    function schemaHasRulesButRef(schema, RULES) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
          return true;
      return false;
    }
    exports.schemaHasRulesButRef = schemaHasRulesButRef;
    function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword2, $data) {
      if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
          return schema;
        if (typeof schema == "string")
          return (0, codegen_12._)`${schema}`;
      }
      return (0, codegen_12._)`${topSchemaRef}${schemaPath}${(0, codegen_12.getProperty)(keyword2)}`;
    }
    exports.schemaRefOrVal = schemaRefOrVal;
    function unescapeFragment(str) {
      return unescapeJsonPointer(decodeURIComponent(str));
    }
    exports.unescapeFragment = unescapeFragment;
    function escapeFragment(str) {
      return encodeURIComponent(escapeJsonPointer(str));
    }
    exports.escapeFragment = escapeFragment;
    function escapeJsonPointer(str) {
      if (typeof str == "number")
        return `${str}`;
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    exports.escapeJsonPointer = escapeJsonPointer;
    function unescapeJsonPointer(str) {
      return str.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    exports.unescapeJsonPointer = unescapeJsonPointer;
    function eachItem(xs, f) {
      if (Array.isArray(xs)) {
        for (const x of xs)
          f(x);
      } else {
        f(xs);
      }
    }
    exports.eachItem = eachItem;
    function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
      return (gen, from, to, toName) => {
        const res = to === void 0 ? from : to instanceof codegen_12.Name ? (from instanceof codegen_12.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_12.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
        return toName === codegen_12.Name && !(res instanceof codegen_12.Name) ? resultToName(gen, res) : res;
      };
    }
    exports.mergeEvaluated = {
      props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_12._)`${to} !== true && ${from} !== undefined`, () => {
          gen.if((0, codegen_12._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_12._)`${to} || {}`).code((0, codegen_12._)`Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_12._)`${to} !== true`, () => {
          if (from === true) {
            gen.assign(to, true);
          } else {
            gen.assign(to, (0, codegen_12._)`${to} || {}`);
            setEvaluated(gen, to, from);
          }
        }),
        mergeValues: (from, to) => from === true ? true : { ...from, ...to },
        resultToName: evaluatedPropsToName
      }),
      items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_12._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_12._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_12._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_12._)`${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => from === true ? true : Math.max(from, to),
        resultToName: (gen, items2) => gen.var("items", items2)
      })
    };
    function evaluatedPropsToName(gen, ps) {
      if (ps === true)
        return gen.var("props", true);
      const props = gen.var("props", (0, codegen_12._)`{}`);
      if (ps !== void 0)
        setEvaluated(gen, props, ps);
      return props;
    }
    exports.evaluatedPropsToName = evaluatedPropsToName;
    function setEvaluated(gen, props, ps) {
      Object.keys(ps).forEach((p) => gen.assign((0, codegen_12._)`${props}${(0, codegen_12.getProperty)(p)}`, true));
    }
    exports.setEvaluated = setEvaluated;
    const snippets = {};
    function useFunc(gen, f) {
      return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_12._Code(f.code))
      });
    }
    exports.useFunc = useFunc;
    var Type;
    (function(Type2) {
      Type2[Type2["Num"] = 0] = "Num";
      Type2[Type2["Str"] = 1] = "Str";
    })(Type = exports.Type || (exports.Type = {}));
    function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
      if (dataProp instanceof codegen_12.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax ? isNumber ? (0, codegen_12._)`"[" + ${dataProp} + "]"` : (0, codegen_12._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_12._)`"/" + ${dataProp}` : (0, codegen_12._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
      }
      return jsPropertySyntax ? (0, codegen_12.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
    }
    exports.getErrorPath = getErrorPath;
    function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
      if (!mode)
        return;
      msg = `strict mode: ${msg}`;
      if (mode === true)
        throw new Error(msg);
      it.self.logger.warn(msg);
    }
    exports.checkStrictMode = checkStrictMode;
  })(util);
  var names$1 = {};
  Object.defineProperty(names$1, "__esModule", { value: true });
  const codegen_1$t = codegen;
  const names = {
    // validation function arguments
    data: new codegen_1$t.Name("data"),
    // args passed from referencing schema
    valCxt: new codegen_1$t.Name("valCxt"),
    instancePath: new codegen_1$t.Name("instancePath"),
    parentData: new codegen_1$t.Name("parentData"),
    parentDataProperty: new codegen_1$t.Name("parentDataProperty"),
    rootData: new codegen_1$t.Name("rootData"),
    dynamicAnchors: new codegen_1$t.Name("dynamicAnchors"),
    // function scoped variables
    vErrors: new codegen_1$t.Name("vErrors"),
    errors: new codegen_1$t.Name("errors"),
    this: new codegen_1$t.Name("this"),
    // "globals"
    self: new codegen_1$t.Name("self"),
    scope: new codegen_1$t.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new codegen_1$t.Name("json"),
    jsonPos: new codegen_1$t.Name("jsonPos"),
    jsonLen: new codegen_1$t.Name("jsonLen"),
    jsonPart: new codegen_1$t.Name("jsonPart")
  };
  names$1.default = names;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
    const codegen_12 = codegen;
    const util_12 = util;
    const names_12 = names$1;
    exports.keywordError = {
      message: ({ keyword: keyword2 }) => (0, codegen_12.str)`must pass "${keyword2}" keyword validation`
    };
    exports.keyword$DataError = {
      message: ({ keyword: keyword2, schemaType }) => schemaType ? (0, codegen_12.str)`"${keyword2}" keyword must be ${schemaType} ($data)` : (0, codegen_12.str)`"${keyword2}" keyword is invalid ($data)`
    };
    function reportError(cxt, error2 = exports.keywordError, errorPaths, overrideAllErrors) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error2, errorPaths);
      if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
      } else {
        returnErrors(it, (0, codegen_12._)`[${errObj}]`);
      }
    }
    exports.reportError = reportError;
    function reportExtraError(cxt, error2 = exports.keywordError, errorPaths) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error2, errorPaths);
      addError(gen, errObj);
      if (!(compositeRule || allErrors)) {
        returnErrors(it, names_12.default.vErrors);
      }
    }
    exports.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_12.default.errors, errsCount);
      gen.if((0, codegen_12._)`${names_12.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_12._)`${names_12.default.vErrors}.length`, errsCount), () => gen.assign(names_12.default.vErrors, null)));
    }
    exports.resetErrorsCount = resetErrorsCount;
    function extendErrors({ gen, keyword: keyword2, schemaValue, data, errsCount, it }) {
      if (errsCount === void 0)
        throw new Error("ajv implementation error");
      const err = gen.name("err");
      gen.forRange("i", errsCount, names_12.default.errors, (i) => {
        gen.const(err, (0, codegen_12._)`${names_12.default.vErrors}[${i}]`);
        gen.if((0, codegen_12._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_12._)`${err}.instancePath`, (0, codegen_12.strConcat)(names_12.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_12._)`${err}.schemaPath`, (0, codegen_12.str)`${it.errSchemaPath}/${keyword2}`);
        if (it.opts.verbose) {
          gen.assign((0, codegen_12._)`${err}.schema`, schemaValue);
          gen.assign((0, codegen_12._)`${err}.data`, data);
        }
      });
    }
    exports.extendErrors = extendErrors;
    function addError(gen, errObj) {
      const err = gen.const("err", errObj);
      gen.if((0, codegen_12._)`${names_12.default.vErrors} === null`, () => gen.assign(names_12.default.vErrors, (0, codegen_12._)`[${err}]`), (0, codegen_12._)`${names_12.default.vErrors}.push(${err})`);
      gen.code((0, codegen_12._)`${names_12.default.errors}++`);
    }
    function returnErrors(it, errs) {
      const { gen, validateName, schemaEnv } = it;
      if (schemaEnv.$async) {
        gen.throw((0, codegen_12._)`new ${it.ValidationError}(${errs})`);
      } else {
        gen.assign((0, codegen_12._)`${validateName}.errors`, errs);
        gen.return(false);
      }
    }
    const E = {
      keyword: new codegen_12.Name("keyword"),
      schemaPath: new codegen_12.Name("schemaPath"),
      params: new codegen_12.Name("params"),
      propertyName: new codegen_12.Name("propertyName"),
      message: new codegen_12.Name("message"),
      schema: new codegen_12.Name("schema"),
      parentSchema: new codegen_12.Name("parentSchema")
    };
    function errorObjectCode(cxt, error2, errorPaths) {
      const { createErrors } = cxt.it;
      if (createErrors === false)
        return (0, codegen_12._)`{}`;
      return errorObject(cxt, error2, errorPaths);
    }
    function errorObject(cxt, error2, errorPaths = {}) {
      const { gen, it } = cxt;
      const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths)
      ];
      extraErrorProps(cxt, error2, keyValues);
      return gen.object(...keyValues);
    }
    function errorInstancePath({ errorPath }, { instancePath }) {
      const instPath = instancePath ? (0, codegen_12.str)`${errorPath}${(0, util_12.getErrorPath)(instancePath, util_12.Type.Str)}` : errorPath;
      return [names_12.default.instancePath, (0, codegen_12.strConcat)(names_12.default.instancePath, instPath)];
    }
    function errorSchemaPath({ keyword: keyword2, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
      let schPath = parentSchema ? errSchemaPath : (0, codegen_12.str)`${errSchemaPath}/${keyword2}`;
      if (schemaPath) {
        schPath = (0, codegen_12.str)`${schPath}${(0, util_12.getErrorPath)(schemaPath, util_12.Type.Str)}`;
      }
      return [E.schemaPath, schPath];
    }
    function extraErrorProps(cxt, { params, message }, keyValues) {
      const { keyword: keyword2, data, schemaValue, it } = cxt;
      const { opts, propertyName, topSchemaRef, schemaPath } = it;
      keyValues.push([E.keyword, keyword2], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_12._)`{}`]);
      if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
      }
      if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_12._)`${topSchemaRef}${schemaPath}`], [names_12.default.data, data]);
      }
      if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
    }
  })(errors);
  Object.defineProperty(boolSchema, "__esModule", { value: true });
  boolSchema.boolOrEmptySchema = boolSchema.topBoolOrEmptySchema = void 0;
  const errors_1$2 = errors;
  const codegen_1$s = codegen;
  const names_1$6 = names$1;
  const boolError = {
    message: "boolean schema is false"
  };
  function topBoolOrEmptySchema(it) {
    const { gen, schema, validateName } = it;
    if (schema === false) {
      falseSchemaError(it, false);
    } else if (typeof schema == "object" && schema.$async === true) {
      gen.return(names_1$6.default.data);
    } else {
      gen.assign((0, codegen_1$s._)`${validateName}.errors`, null);
      gen.return(true);
    }
  }
  boolSchema.topBoolOrEmptySchema = topBoolOrEmptySchema;
  function boolOrEmptySchema(it, valid) {
    const { gen, schema } = it;
    if (schema === false) {
      gen.var(valid, false);
      falseSchemaError(it);
    } else {
      gen.var(valid, true);
    }
  }
  boolSchema.boolOrEmptySchema = boolOrEmptySchema;
  function falseSchemaError(it, overrideAllErrors) {
    const { gen, data } = it;
    const cxt = {
      gen,
      keyword: "false schema",
      data,
      schema: false,
      schemaCode: false,
      schemaValue: false,
      params: {},
      it
    };
    (0, errors_1$2.reportError)(cxt, boolError, void 0, overrideAllErrors);
  }
  var dataType = {};
  var rules = {};
  Object.defineProperty(rules, "__esModule", { value: true });
  rules.getRules = rules.isJSONType = void 0;
  const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
  const jsonTypes = new Set(_jsonTypes);
  function isJSONType(x) {
    return typeof x == "string" && jsonTypes.has(x);
  }
  rules.isJSONType = isJSONType;
  function getRules() {
    const groups = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...groups, integer: true, boolean: true, null: true },
      rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  rules.getRules = getRules;
  var applicability = {};
  Object.defineProperty(applicability, "__esModule", { value: true });
  applicability.shouldUseRule = applicability.shouldUseGroup = applicability.schemaHasRulesForType = void 0;
  function schemaHasRulesForType({ schema, self: self2 }, type2) {
    const group = self2.RULES.types[type2];
    return group && group !== true && shouldUseGroup(schema, group);
  }
  applicability.schemaHasRulesForType = schemaHasRulesForType;
  function shouldUseGroup(schema, group) {
    return group.rules.some((rule) => shouldUseRule(schema, rule));
  }
  applicability.shouldUseGroup = shouldUseGroup;
  function shouldUseRule(schema, rule) {
    var _a;
    return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
  }
  applicability.shouldUseRule = shouldUseRule;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
    const rules_1 = rules;
    const applicability_12 = applicability;
    const errors_12 = errors;
    const codegen_12 = codegen;
    const util_12 = util;
    var DataType;
    (function(DataType2) {
      DataType2[DataType2["Correct"] = 0] = "Correct";
      DataType2[DataType2["Wrong"] = 1] = "Wrong";
    })(DataType = exports.DataType || (exports.DataType = {}));
    function getSchemaTypes(schema) {
      const types2 = getJSONTypes(schema.type);
      const hasNull = types2.includes("null");
      if (hasNull) {
        if (schema.nullable === false)
          throw new Error("type: null contradicts nullable: false");
      } else {
        if (!types2.length && schema.nullable !== void 0) {
          throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
          types2.push("null");
      }
      return types2;
    }
    exports.getSchemaTypes = getSchemaTypes;
    function getJSONTypes(ts) {
      const types2 = Array.isArray(ts) ? ts : ts ? [ts] : [];
      if (types2.every(rules_1.isJSONType))
        return types2;
      throw new Error("type must be JSONType or JSONType[]: " + types2.join(","));
    }
    exports.getJSONTypes = getJSONTypes;
    function coerceAndCheckDataType(it, types2) {
      const { gen, data, opts } = it;
      const coerceTo = coerceToTypes(types2, opts.coerceTypes);
      const checkTypes = types2.length > 0 && !(coerceTo.length === 0 && types2.length === 1 && (0, applicability_12.schemaHasRulesForType)(it, types2[0]));
      if (checkTypes) {
        const wrongType = checkDataTypes(types2, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
          if (coerceTo.length)
            coerceData(it, types2, coerceTo);
          else
            reportTypeError(it);
        });
      }
      return checkTypes;
    }
    exports.coerceAndCheckDataType = coerceAndCheckDataType;
    const COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
    function coerceToTypes(types2, coerceTypes) {
      return coerceTypes ? types2.filter((t2) => COERCIBLE.has(t2) || coerceTypes === "array" && t2 === "array") : [];
    }
    function coerceData(it, types2, coerceTo) {
      const { gen, data, opts } = it;
      const dataType2 = gen.let("dataType", (0, codegen_12._)`typeof ${data}`);
      const coerced = gen.let("coerced", (0, codegen_12._)`undefined`);
      if (opts.coerceTypes === "array") {
        gen.if((0, codegen_12._)`${dataType2} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_12._)`${data}[0]`).assign(dataType2, (0, codegen_12._)`typeof ${data}`).if(checkDataTypes(types2, data, opts.strictNumbers), () => gen.assign(coerced, data)));
      }
      gen.if((0, codegen_12._)`${coerced} !== undefined`);
      for (const t2 of coerceTo) {
        if (COERCIBLE.has(t2) || t2 === "array" && opts.coerceTypes === "array") {
          coerceSpecificType(t2);
        }
      }
      gen.else();
      reportTypeError(it);
      gen.endIf();
      gen.if((0, codegen_12._)`${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
      });
      function coerceSpecificType(t2) {
        switch (t2) {
          case "string":
            gen.elseIf((0, codegen_12._)`${dataType2} == "number" || ${dataType2} == "boolean"`).assign(coerced, (0, codegen_12._)`"" + ${data}`).elseIf((0, codegen_12._)`${data} === null`).assign(coerced, (0, codegen_12._)`""`);
            return;
          case "number":
            gen.elseIf((0, codegen_12._)`${dataType2} == "boolean" || ${data} === null
              || (${dataType2} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_12._)`+${data}`);
            return;
          case "integer":
            gen.elseIf((0, codegen_12._)`${dataType2} === "boolean" || ${data} === null
              || (${dataType2} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_12._)`+${data}`);
            return;
          case "boolean":
            gen.elseIf((0, codegen_12._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_12._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
            return;
          case "null":
            gen.elseIf((0, codegen_12._)`${data} === "" || ${data} === 0 || ${data} === false`);
            gen.assign(coerced, null);
            return;
          case "array":
            gen.elseIf((0, codegen_12._)`${dataType2} === "string" || ${dataType2} === "number"
              || ${dataType2} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_12._)`[${data}]`);
        }
      }
    }
    function assignParentData({ gen, parentData, parentDataProperty }, expr) {
      gen.if((0, codegen_12._)`${parentData} !== undefined`, () => gen.assign((0, codegen_12._)`${parentData}[${parentDataProperty}]`, expr));
    }
    function checkDataType(dataType2, data, strictNums, correct = DataType.Correct) {
      const EQ = correct === DataType.Correct ? codegen_12.operators.EQ : codegen_12.operators.NEQ;
      let cond;
      switch (dataType2) {
        case "null":
          return (0, codegen_12._)`${data} ${EQ} null`;
        case "array":
          cond = (0, codegen_12._)`Array.isArray(${data})`;
          break;
        case "object":
          cond = (0, codegen_12._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
          break;
        case "integer":
          cond = numCond((0, codegen_12._)`!(${data} % 1) && !isNaN(${data})`);
          break;
        case "number":
          cond = numCond();
          break;
        default:
          return (0, codegen_12._)`typeof ${data} ${EQ} ${dataType2}`;
      }
      return correct === DataType.Correct ? cond : (0, codegen_12.not)(cond);
      function numCond(_cond = codegen_12.nil) {
        return (0, codegen_12.and)((0, codegen_12._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_12._)`isFinite(${data})` : codegen_12.nil);
      }
    }
    exports.checkDataType = checkDataType;
    function checkDataTypes(dataTypes, data, strictNums, correct) {
      if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
      }
      let cond;
      const types2 = (0, util_12.toHash)(dataTypes);
      if (types2.array && types2.object) {
        const notObj = (0, codegen_12._)`typeof ${data} != "object"`;
        cond = types2.null ? notObj : (0, codegen_12._)`!${data} || ${notObj}`;
        delete types2.null;
        delete types2.array;
        delete types2.object;
      } else {
        cond = codegen_12.nil;
      }
      if (types2.number)
        delete types2.integer;
      for (const t2 in types2)
        cond = (0, codegen_12.and)(cond, checkDataType(t2, data, strictNums, correct));
      return cond;
    }
    exports.checkDataTypes = checkDataTypes;
    const typeError = {
      message: ({ schema }) => `must be ${schema}`,
      params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_12._)`{type: ${schema}}` : (0, codegen_12._)`{type: ${schemaValue}}`
    };
    function reportTypeError(it) {
      const cxt = getTypeErrorContext(it);
      (0, errors_12.reportError)(cxt, typeError);
    }
    exports.reportTypeError = reportTypeError;
    function getTypeErrorContext(it) {
      const { gen, data, schema } = it;
      const schemaCode = (0, util_12.schemaRefOrVal)(it, schema, "type");
      return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it
      };
    }
  })(dataType);
  var defaults = {};
  Object.defineProperty(defaults, "__esModule", { value: true });
  defaults.assignDefaults = void 0;
  const codegen_1$r = codegen;
  const util_1$p = util;
  function assignDefaults(it, ty) {
    const { properties: properties2, items: items2 } = it.schema;
    if (ty === "object" && properties2) {
      for (const key in properties2) {
        assignDefault(it, key, properties2[key].default);
      }
    } else if (ty === "array" && Array.isArray(items2)) {
      items2.forEach((sch, i) => assignDefault(it, i, sch.default));
    }
  }
  defaults.assignDefaults = assignDefaults;
  function assignDefault(it, prop, defaultValue) {
    const { gen, compositeRule, data, opts } = it;
    if (defaultValue === void 0)
      return;
    const childData = (0, codegen_1$r._)`${data}${(0, codegen_1$r.getProperty)(prop)}`;
    if (compositeRule) {
      (0, util_1$p.checkStrictMode)(it, `default is ignored for: ${childData}`);
      return;
    }
    let condition = (0, codegen_1$r._)`${childData} === undefined`;
    if (opts.useDefaults === "empty") {
      condition = (0, codegen_1$r._)`${condition} || ${childData} === null || ${childData} === ""`;
    }
    gen.if(condition, (0, codegen_1$r._)`${childData} = ${(0, codegen_1$r.stringify)(defaultValue)}`);
  }
  var keyword = {};
  var code = {};
  Object.defineProperty(code, "__esModule", { value: true });
  code.validateUnion = code.validateArray = code.usePattern = code.callValidateCode = code.schemaProperties = code.allSchemaProperties = code.noPropertyInData = code.propertyInData = code.isOwnProperty = code.hasPropFunc = code.reportMissingProp = code.checkMissingProp = code.checkReportMissingProp = void 0;
  const codegen_1$q = codegen;
  const util_1$o = util;
  const names_1$5 = names$1;
  const util_2$1 = util;
  function checkReportMissingProp(cxt, prop) {
    const { gen, data, it } = cxt;
    gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
      cxt.setParams({ missingProperty: (0, codegen_1$q._)`${prop}` }, true);
      cxt.error();
    });
  }
  code.checkReportMissingProp = checkReportMissingProp;
  function checkMissingProp({ gen, data, it: { opts } }, properties2, missing) {
    return (0, codegen_1$q.or)(...properties2.map((prop) => (0, codegen_1$q.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1$q._)`${missing} = ${prop}`)));
  }
  code.checkMissingProp = checkMissingProp;
  function reportMissingProp(cxt, missing) {
    cxt.setParams({ missingProperty: missing }, true);
    cxt.error();
  }
  code.reportMissingProp = reportMissingProp;
  function hasPropFunc(gen) {
    return gen.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, codegen_1$q._)`Object.prototype.hasOwnProperty`
    });
  }
  code.hasPropFunc = hasPropFunc;
  function isOwnProperty(gen, data, property) {
    return (0, codegen_1$q._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
  }
  code.isOwnProperty = isOwnProperty;
  function propertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1$q._)`${data}${(0, codegen_1$q.getProperty)(property)} !== undefined`;
    return ownProperties ? (0, codegen_1$q._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
  }
  code.propertyInData = propertyInData;
  function noPropertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1$q._)`${data}${(0, codegen_1$q.getProperty)(property)} === undefined`;
    return ownProperties ? (0, codegen_1$q.or)(cond, (0, codegen_1$q.not)(isOwnProperty(gen, data, property))) : cond;
  }
  code.noPropertyInData = noPropertyInData;
  function allSchemaProperties(schemaMap) {
    return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
  }
  code.allSchemaProperties = allSchemaProperties;
  function schemaProperties(it, schemaMap) {
    return allSchemaProperties(schemaMap).filter((p) => !(0, util_1$o.alwaysValidSchema)(it, schemaMap[p]));
  }
  code.schemaProperties = schemaProperties;
  function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
    const dataAndSchema = passSchema ? (0, codegen_1$q._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
    const valCxt = [
      [names_1$5.default.instancePath, (0, codegen_1$q.strConcat)(names_1$5.default.instancePath, errorPath)],
      [names_1$5.default.parentData, it.parentData],
      [names_1$5.default.parentDataProperty, it.parentDataProperty],
      [names_1$5.default.rootData, names_1$5.default.rootData]
    ];
    if (it.opts.dynamicRef)
      valCxt.push([names_1$5.default.dynamicAnchors, names_1$5.default.dynamicAnchors]);
    const args = (0, codegen_1$q._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
    return context !== codegen_1$q.nil ? (0, codegen_1$q._)`${func}.call(${context}, ${args})` : (0, codegen_1$q._)`${func}(${args})`;
  }
  code.callValidateCode = callValidateCode;
  const newRegExp = (0, codegen_1$q._)`new RegExp`;
  function usePattern({ gen, it: { opts } }, pattern2) {
    const u = opts.unicodeRegExp ? "u" : "";
    const { regExp } = opts.code;
    const rx = regExp(pattern2, u);
    return gen.scopeValue("pattern", {
      key: rx.toString(),
      ref: rx,
      code: (0, codegen_1$q._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2$1.useFunc)(gen, regExp)}(${pattern2}, ${u})`
    });
  }
  code.usePattern = usePattern;
  function validateArray(cxt) {
    const { gen, data, keyword: keyword2, it } = cxt;
    const valid = gen.name("valid");
    if (it.allErrors) {
      const validArr = gen.let("valid", true);
      validateItems(() => gen.assign(validArr, false));
      return validArr;
    }
    gen.var(valid, true);
    validateItems(() => gen.break());
    return valid;
    function validateItems(notValid) {
      const len = gen.const("len", (0, codegen_1$q._)`${data}.length`);
      gen.forRange("i", 0, len, (i) => {
        cxt.subschema({
          keyword: keyword2,
          dataProp: i,
          dataPropType: util_1$o.Type.Num
        }, valid);
        gen.if((0, codegen_1$q.not)(valid), notValid);
      });
    }
  }
  code.validateArray = validateArray;
  function validateUnion(cxt) {
    const { gen, schema, keyword: keyword2, it } = cxt;
    if (!Array.isArray(schema))
      throw new Error("ajv implementation error");
    const alwaysValid = schema.some((sch) => (0, util_1$o.alwaysValidSchema)(it, sch));
    if (alwaysValid && !it.opts.unevaluated)
      return;
    const valid = gen.let("valid", false);
    const schValid = gen.name("_valid");
    gen.block(() => schema.forEach((_sch, i) => {
      const schCxt = cxt.subschema({
        keyword: keyword2,
        schemaProp: i,
        compositeRule: true
      }, schValid);
      gen.assign(valid, (0, codegen_1$q._)`${valid} || ${schValid}`);
      const merged = cxt.mergeValidEvaluated(schCxt, schValid);
      if (!merged)
        gen.if((0, codegen_1$q.not)(valid));
    }));
    cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
  }
  code.validateUnion = validateUnion;
  Object.defineProperty(keyword, "__esModule", { value: true });
  keyword.validateKeywordUsage = keyword.validSchemaType = keyword.funcKeywordCode = keyword.macroKeywordCode = void 0;
  const codegen_1$p = codegen;
  const names_1$4 = names$1;
  const code_1$9 = code;
  const errors_1$1 = errors;
  function macroKeywordCode(cxt, def2) {
    const { gen, keyword: keyword2, schema, parentSchema, it } = cxt;
    const macroSchema = def2.macro.call(it.self, schema, parentSchema, it);
    const schemaRef = useKeyword(gen, keyword2, macroSchema);
    if (it.opts.validateSchema !== false)
      it.self.validateSchema(macroSchema, true);
    const valid = gen.name("valid");
    cxt.subschema({
      schema: macroSchema,
      schemaPath: codegen_1$p.nil,
      errSchemaPath: `${it.errSchemaPath}/${keyword2}`,
      topSchemaRef: schemaRef,
      compositeRule: true
    }, valid);
    cxt.pass(valid, () => cxt.error(true));
  }
  keyword.macroKeywordCode = macroKeywordCode;
  function funcKeywordCode(cxt, def2) {
    var _a;
    const { gen, keyword: keyword2, schema, parentSchema, $data, it } = cxt;
    checkAsyncKeyword(it, def2);
    const validate2 = !$data && def2.compile ? def2.compile.call(it.self, schema, parentSchema, it) : def2.validate;
    const validateRef = useKeyword(gen, keyword2, validate2);
    const valid = gen.let("valid");
    cxt.block$data(valid, validateKeyword);
    cxt.ok((_a = def2.valid) !== null && _a !== void 0 ? _a : valid);
    function validateKeyword() {
      if (def2.errors === false) {
        assignValid();
        if (def2.modifying)
          modifyData(cxt);
        reportErrs(() => cxt.error());
      } else {
        const ruleErrs = def2.async ? validateAsync() : validateSync();
        if (def2.modifying)
          modifyData(cxt);
        reportErrs(() => addErrs(cxt, ruleErrs));
      }
    }
    function validateAsync() {
      const ruleErrs = gen.let("ruleErrs", null);
      gen.try(() => assignValid((0, codegen_1$p._)`await `), (e) => gen.assign(valid, false).if((0, codegen_1$p._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1$p._)`${e}.errors`), () => gen.throw(e)));
      return ruleErrs;
    }
    function validateSync() {
      const validateErrs = (0, codegen_1$p._)`${validateRef}.errors`;
      gen.assign(validateErrs, null);
      assignValid(codegen_1$p.nil);
      return validateErrs;
    }
    function assignValid(_await = def2.async ? (0, codegen_1$p._)`await ` : codegen_1$p.nil) {
      const passCxt = it.opts.passContext ? names_1$4.default.this : names_1$4.default.self;
      const passSchema = !("compile" in def2 && !$data || def2.schema === false);
      gen.assign(valid, (0, codegen_1$p._)`${_await}${(0, code_1$9.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def2.modifying);
    }
    function reportErrs(errors2) {
      var _a2;
      gen.if((0, codegen_1$p.not)((_a2 = def2.valid) !== null && _a2 !== void 0 ? _a2 : valid), errors2);
    }
  }
  keyword.funcKeywordCode = funcKeywordCode;
  function modifyData(cxt) {
    const { gen, data, it } = cxt;
    gen.if(it.parentData, () => gen.assign(data, (0, codegen_1$p._)`${it.parentData}[${it.parentDataProperty}]`));
  }
  function addErrs(cxt, errs) {
    const { gen } = cxt;
    gen.if((0, codegen_1$p._)`Array.isArray(${errs})`, () => {
      gen.assign(names_1$4.default.vErrors, (0, codegen_1$p._)`${names_1$4.default.vErrors} === null ? ${errs} : ${names_1$4.default.vErrors}.concat(${errs})`).assign(names_1$4.default.errors, (0, codegen_1$p._)`${names_1$4.default.vErrors}.length`);
      (0, errors_1$1.extendErrors)(cxt);
    }, () => cxt.error());
  }
  function checkAsyncKeyword({ schemaEnv }, def2) {
    if (def2.async && !schemaEnv.$async)
      throw new Error("async keyword in sync schema");
  }
  function useKeyword(gen, keyword2, result) {
    if (result === void 0)
      throw new Error(`keyword "${keyword2}" failed to compile`);
    return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1$p.stringify)(result) });
  }
  function validSchemaType(schema, schemaType, allowUndefined = false) {
    return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
  }
  keyword.validSchemaType = validSchemaType;
  function validateKeywordUsage({ schema, opts, self: self2, errSchemaPath }, def2, keyword2) {
    if (Array.isArray(def2.keyword) ? !def2.keyword.includes(keyword2) : def2.keyword !== keyword2) {
      throw new Error("ajv implementation error");
    }
    const deps = def2.dependencies;
    if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
      throw new Error(`parent schema must have dependencies of ${keyword2}: ${deps.join(",")}`);
    }
    if (def2.validateSchema) {
      const valid = def2.validateSchema(schema[keyword2]);
      if (!valid) {
        const msg = `keyword "${keyword2}" value is invalid at path "${errSchemaPath}": ` + self2.errorsText(def2.validateSchema.errors);
        if (opts.validateSchema === "log")
          self2.logger.error(msg);
        else
          throw new Error(msg);
      }
    }
  }
  keyword.validateKeywordUsage = validateKeywordUsage;
  var subschema = {};
  Object.defineProperty(subschema, "__esModule", { value: true });
  subschema.extendSubschemaMode = subschema.extendSubschemaData = subschema.getSubschema = void 0;
  const codegen_1$o = codegen;
  const util_1$n = util;
  function getSubschema(it, { keyword: keyword2, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
    if (keyword2 !== void 0 && schema !== void 0) {
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    }
    if (keyword2 !== void 0) {
      const sch = it.schema[keyword2];
      return schemaProp === void 0 ? {
        schema: sch,
        schemaPath: (0, codegen_1$o._)`${it.schemaPath}${(0, codegen_1$o.getProperty)(keyword2)}`,
        errSchemaPath: `${it.errSchemaPath}/${keyword2}`
      } : {
        schema: sch[schemaProp],
        schemaPath: (0, codegen_1$o._)`${it.schemaPath}${(0, codegen_1$o.getProperty)(keyword2)}${(0, codegen_1$o.getProperty)(schemaProp)}`,
        errSchemaPath: `${it.errSchemaPath}/${keyword2}/${(0, util_1$n.escapeFragment)(schemaProp)}`
      };
    }
    if (schema !== void 0) {
      if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      }
      return {
        schema,
        schemaPath,
        topSchemaRef,
        errSchemaPath
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  subschema.getSubschema = getSubschema;
  function extendSubschemaData(subschema2, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
    if (data !== void 0 && dataProp !== void 0) {
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    }
    const { gen } = it;
    if (dataProp !== void 0) {
      const { errorPath, dataPathArr, opts } = it;
      const nextData = gen.let("data", (0, codegen_1$o._)`${it.data}${(0, codegen_1$o.getProperty)(dataProp)}`, true);
      dataContextProps(nextData);
      subschema2.errorPath = (0, codegen_1$o.str)`${errorPath}${(0, util_1$n.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
      subschema2.parentDataProperty = (0, codegen_1$o._)`${dataProp}`;
      subschema2.dataPathArr = [...dataPathArr, subschema2.parentDataProperty];
    }
    if (data !== void 0) {
      const nextData = data instanceof codegen_1$o.Name ? data : gen.let("data", data, true);
      dataContextProps(nextData);
      if (propertyName !== void 0)
        subschema2.propertyName = propertyName;
    }
    if (dataTypes)
      subschema2.dataTypes = dataTypes;
    function dataContextProps(_nextData) {
      subschema2.data = _nextData;
      subschema2.dataLevel = it.dataLevel + 1;
      subschema2.dataTypes = [];
      it.definedProperties = /* @__PURE__ */ new Set();
      subschema2.parentData = it.data;
      subschema2.dataNames = [...it.dataNames, _nextData];
    }
  }
  subschema.extendSubschemaData = extendSubschemaData;
  function extendSubschemaMode(subschema2, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
    if (compositeRule !== void 0)
      subschema2.compositeRule = compositeRule;
    if (createErrors !== void 0)
      subschema2.createErrors = createErrors;
    if (allErrors !== void 0)
      subschema2.allErrors = allErrors;
    subschema2.jtdDiscriminator = jtdDiscriminator;
    subschema2.jtdMetadata = jtdMetadata;
  }
  subschema.extendSubschemaMode = extendSubschemaMode;
  var resolve$1 = {};
  var fastDeepEqual = function equal2(a, b) {
    if (a === b)
      return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
      if (a.constructor !== b.constructor)
        return false;
      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length)
          return false;
        for (i = length; i-- !== 0; )
          if (!equal2(a[i], b[i]))
            return false;
        return true;
      }
      if (a.constructor === RegExp)
        return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf)
        return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString)
        return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length)
        return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
          return false;
      for (i = length; i-- !== 0; ) {
        var key = keys[i];
        if (!equal2(a[key], b[key]))
          return false;
      }
      return true;
    }
    return a !== a && b !== b;
  };
  var jsonSchemaTraverse = { exports: {} };
  var traverse$1 = jsonSchemaTraverse.exports = function(schema, opts, cb) {
    if (typeof opts == "function") {
      cb = opts;
      opts = {};
    }
    cb = opts.cb || cb;
    var pre = typeof cb == "function" ? cb : cb.pre || function() {
    };
    var post = cb.post || function() {
    };
    _traverse(opts, pre, post, schema, "", schema);
  };
  traverse$1.keywords = {
    additionalItems: true,
    items: true,
    contains: true,
    additionalProperties: true,
    propertyNames: true,
    not: true,
    if: true,
    then: true,
    else: true
  };
  traverse$1.arrayKeywords = {
    items: true,
    allOf: true,
    anyOf: true,
    oneOf: true
  };
  traverse$1.propsKeywords = {
    $defs: true,
    definitions: true,
    properties: true,
    patternProperties: true,
    dependencies: true
  };
  traverse$1.skipKeywords = {
    default: true,
    enum: true,
    const: true,
    required: true,
    maximum: true,
    minimum: true,
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    multipleOf: true,
    maxLength: true,
    minLength: true,
    pattern: true,
    format: true,
    maxItems: true,
    minItems: true,
    uniqueItems: true,
    maxProperties: true,
    minProperties: true
  };
  function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
    if (schema && typeof schema == "object" && !Array.isArray(schema)) {
      pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      for (var key in schema) {
        var sch = schema[key];
        if (Array.isArray(sch)) {
          if (key in traverse$1.arrayKeywords) {
            for (var i = 0; i < sch.length; i++)
              _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
          }
        } else if (key in traverse$1.propsKeywords) {
          if (sch && typeof sch == "object") {
            for (var prop in sch)
              _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
          }
        } else if (key in traverse$1.keywords || opts.allKeys && !(key in traverse$1.skipKeywords)) {
          _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
        }
      }
      post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    }
  }
  function escapeJsonPtr(str) {
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  var jsonSchemaTraverseExports = jsonSchemaTraverse.exports;
  Object.defineProperty(resolve$1, "__esModule", { value: true });
  resolve$1.getSchemaRefs = resolve$1.resolveUrl = resolve$1.normalizeId = resolve$1._getFullPath = resolve$1.getFullPath = resolve$1.inlineRef = void 0;
  const util_1$m = util;
  const equal$2 = fastDeepEqual;
  const traverse = jsonSchemaTraverseExports;
  const SIMPLE_INLINED = /* @__PURE__ */ new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
  ]);
  function inlineRef(schema, limit = true) {
    if (typeof schema == "boolean")
      return true;
    if (limit === true)
      return !hasRef(schema);
    if (!limit)
      return false;
    return countKeys(schema) <= limit;
  }
  resolve$1.inlineRef = inlineRef;
  const REF_KEYWORDS = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function hasRef(schema) {
    for (const key in schema) {
      if (REF_KEYWORDS.has(key))
        return true;
      const sch = schema[key];
      if (Array.isArray(sch) && sch.some(hasRef))
        return true;
      if (typeof sch == "object" && hasRef(sch))
        return true;
    }
    return false;
  }
  function countKeys(schema) {
    let count = 0;
    for (const key in schema) {
      if (key === "$ref")
        return Infinity;
      count++;
      if (SIMPLE_INLINED.has(key))
        continue;
      if (typeof schema[key] == "object") {
        (0, util_1$m.eachItem)(schema[key], (sch) => count += countKeys(sch));
      }
      if (count === Infinity)
        return Infinity;
    }
    return count;
  }
  function getFullPath(resolver, id2 = "", normalize) {
    if (normalize !== false)
      id2 = normalizeId(id2);
    const p = resolver.parse(id2);
    return _getFullPath(resolver, p);
  }
  resolve$1.getFullPath = getFullPath;
  function _getFullPath(resolver, p) {
    const serialized = resolver.serialize(p);
    return serialized.split("#")[0] + "#";
  }
  resolve$1._getFullPath = _getFullPath;
  const TRAILING_SLASH_HASH = /#\/?$/;
  function normalizeId(id2) {
    return id2 ? id2.replace(TRAILING_SLASH_HASH, "") : "";
  }
  resolve$1.normalizeId = normalizeId;
  function resolveUrl(resolver, baseId, id2) {
    id2 = normalizeId(id2);
    return resolver.resolve(baseId, id2);
  }
  resolve$1.resolveUrl = resolveUrl;
  const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
  function getSchemaRefs(schema, baseId) {
    if (typeof schema == "boolean")
      return {};
    const { schemaId, uriResolver } = this.opts;
    const schId = normalizeId(schema[schemaId] || baseId);
    const baseIds = { "": schId };
    const pathPrefix = getFullPath(uriResolver, schId, false);
    const localRefs = {};
    const schemaRefs = /* @__PURE__ */ new Set();
    traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
      if (parentJsonPtr === void 0)
        return;
      const fullPath = pathPrefix + jsonPtr;
      let baseId2 = baseIds[parentJsonPtr];
      if (typeof sch[schemaId] == "string")
        baseId2 = addRef.call(this, sch[schemaId]);
      addAnchor.call(this, sch.$anchor);
      addAnchor.call(this, sch.$dynamicAnchor);
      baseIds[jsonPtr] = baseId2;
      function addRef(ref2) {
        const _resolve = this.opts.uriResolver.resolve;
        ref2 = normalizeId(baseId2 ? _resolve(baseId2, ref2) : ref2);
        if (schemaRefs.has(ref2))
          throw ambiguos(ref2);
        schemaRefs.add(ref2);
        let schOrRef = this.refs[ref2];
        if (typeof schOrRef == "string")
          schOrRef = this.refs[schOrRef];
        if (typeof schOrRef == "object") {
          checkAmbiguosRef(sch, schOrRef.schema, ref2);
        } else if (ref2 !== normalizeId(fullPath)) {
          if (ref2[0] === "#") {
            checkAmbiguosRef(sch, localRefs[ref2], ref2);
            localRefs[ref2] = sch;
          } else {
            this.refs[ref2] = fullPath;
          }
        }
        return ref2;
      }
      function addAnchor(anchor) {
        if (typeof anchor == "string") {
          if (!ANCHOR.test(anchor))
            throw new Error(`invalid anchor "${anchor}"`);
          addRef.call(this, `#${anchor}`);
        }
      }
    });
    return localRefs;
    function checkAmbiguosRef(sch1, sch2, ref2) {
      if (sch2 !== void 0 && !equal$2(sch1, sch2))
        throw ambiguos(ref2);
    }
    function ambiguos(ref2) {
      return new Error(`reference "${ref2}" resolves to more than one schema`);
    }
  }
  resolve$1.getSchemaRefs = getSchemaRefs;
  Object.defineProperty(validate, "__esModule", { value: true });
  validate.getData = validate.KeywordCxt = validate.validateFunctionCode = void 0;
  const boolSchema_1 = boolSchema;
  const dataType_1$1 = dataType;
  const applicability_1 = applicability;
  const dataType_2 = dataType;
  const defaults_1 = defaults;
  const keyword_1 = keyword;
  const subschema_1 = subschema;
  const codegen_1$n = codegen;
  const names_1$3 = names$1;
  const resolve_1$2 = resolve$1;
  const util_1$l = util;
  const errors_1 = errors;
  function validateFunctionCode(it) {
    if (isSchemaObj(it)) {
      checkKeywords(it);
      if (schemaCxtHasRules(it)) {
        topSchemaObjCode(it);
        return;
      }
    }
    validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
  }
  validate.validateFunctionCode = validateFunctionCode;
  function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
    if (opts.code.es5) {
      gen.func(validateName, (0, codegen_1$n._)`${names_1$3.default.data}, ${names_1$3.default.valCxt}`, schemaEnv.$async, () => {
        gen.code((0, codegen_1$n._)`"use strict"; ${funcSourceUrl(schema, opts)}`);
        destructureValCxtES5(gen, opts);
        gen.code(body);
      });
    } else {
      gen.func(validateName, (0, codegen_1$n._)`${names_1$3.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
    }
  }
  function destructureValCxt(opts) {
    return (0, codegen_1$n._)`{${names_1$3.default.instancePath}="", ${names_1$3.default.parentData}, ${names_1$3.default.parentDataProperty}, ${names_1$3.default.rootData}=${names_1$3.default.data}${opts.dynamicRef ? (0, codegen_1$n._)`, ${names_1$3.default.dynamicAnchors}={}` : codegen_1$n.nil}}={}`;
  }
  function destructureValCxtES5(gen, opts) {
    gen.if(names_1$3.default.valCxt, () => {
      gen.var(names_1$3.default.instancePath, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.instancePath}`);
      gen.var(names_1$3.default.parentData, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.parentData}`);
      gen.var(names_1$3.default.parentDataProperty, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.parentDataProperty}`);
      gen.var(names_1$3.default.rootData, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.rootData}`);
      if (opts.dynamicRef)
        gen.var(names_1$3.default.dynamicAnchors, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.dynamicAnchors}`);
    }, () => {
      gen.var(names_1$3.default.instancePath, (0, codegen_1$n._)`""`);
      gen.var(names_1$3.default.parentData, (0, codegen_1$n._)`undefined`);
      gen.var(names_1$3.default.parentDataProperty, (0, codegen_1$n._)`undefined`);
      gen.var(names_1$3.default.rootData, names_1$3.default.data);
      if (opts.dynamicRef)
        gen.var(names_1$3.default.dynamicAnchors, (0, codegen_1$n._)`{}`);
    });
  }
  function topSchemaObjCode(it) {
    const { schema, opts, gen } = it;
    validateFunction(it, () => {
      if (opts.$comment && schema.$comment)
        commentKeyword(it);
      checkNoDefault(it);
      gen.let(names_1$3.default.vErrors, null);
      gen.let(names_1$3.default.errors, 0);
      if (opts.unevaluated)
        resetEvaluated(it);
      typeAndKeywords(it);
      returnResults(it);
    });
    return;
  }
  function resetEvaluated(it) {
    const { gen, validateName } = it;
    it.evaluated = gen.const("evaluated", (0, codegen_1$n._)`${validateName}.evaluated`);
    gen.if((0, codegen_1$n._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1$n._)`${it.evaluated}.props`, (0, codegen_1$n._)`undefined`));
    gen.if((0, codegen_1$n._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1$n._)`${it.evaluated}.items`, (0, codegen_1$n._)`undefined`));
  }
  function funcSourceUrl(schema, opts) {
    const schId = typeof schema == "object" && schema[opts.schemaId];
    return schId && (opts.code.source || opts.code.process) ? (0, codegen_1$n._)`/*# sourceURL=${schId} */` : codegen_1$n.nil;
  }
  function subschemaCode(it, valid) {
    if (isSchemaObj(it)) {
      checkKeywords(it);
      if (schemaCxtHasRules(it)) {
        subSchemaObjCode(it, valid);
        return;
      }
    }
    (0, boolSchema_1.boolOrEmptySchema)(it, valid);
  }
  function schemaCxtHasRules({ schema, self: self2 }) {
    if (typeof schema == "boolean")
      return !schema;
    for (const key in schema)
      if (self2.RULES.all[key])
        return true;
    return false;
  }
  function isSchemaObj(it) {
    return typeof it.schema != "boolean";
  }
  function subSchemaObjCode(it, valid) {
    const { schema, gen, opts } = it;
    if (opts.$comment && schema.$comment)
      commentKeyword(it);
    updateContext(it);
    checkAsyncSchema(it);
    const errsCount = gen.const("_errs", names_1$3.default.errors);
    typeAndKeywords(it, errsCount);
    gen.var(valid, (0, codegen_1$n._)`${errsCount} === ${names_1$3.default.errors}`);
  }
  function checkKeywords(it) {
    (0, util_1$l.checkUnknownRules)(it);
    checkRefsAndKeywords(it);
  }
  function typeAndKeywords(it, errsCount) {
    if (it.opts.jtd)
      return schemaKeywords(it, [], false, errsCount);
    const types2 = (0, dataType_1$1.getSchemaTypes)(it.schema);
    const checkedTypes = (0, dataType_1$1.coerceAndCheckDataType)(it, types2);
    schemaKeywords(it, types2, !checkedTypes, errsCount);
  }
  function checkRefsAndKeywords(it) {
    const { schema, errSchemaPath, opts, self: self2 } = it;
    if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1$l.schemaHasRulesButRef)(schema, self2.RULES)) {
      self2.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
    }
  }
  function checkNoDefault(it) {
    const { schema, opts } = it;
    if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
      (0, util_1$l.checkStrictMode)(it, "default is ignored in the schema root");
    }
  }
  function updateContext(it) {
    const schId = it.schema[it.opts.schemaId];
    if (schId)
      it.baseId = (0, resolve_1$2.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
  }
  function checkAsyncSchema(it) {
    if (it.schema.$async && !it.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
    const msg = schema.$comment;
    if (opts.$comment === true) {
      gen.code((0, codegen_1$n._)`${names_1$3.default.self}.logger.log(${msg})`);
    } else if (typeof opts.$comment == "function") {
      const schemaPath = (0, codegen_1$n.str)`${errSchemaPath}/$comment`;
      const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
      gen.code((0, codegen_1$n._)`${names_1$3.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
    }
  }
  function returnResults(it) {
    const { gen, schemaEnv, validateName, ValidationError: ValidationError2, opts } = it;
    if (schemaEnv.$async) {
      gen.if((0, codegen_1$n._)`${names_1$3.default.errors} === 0`, () => gen.return(names_1$3.default.data), () => gen.throw((0, codegen_1$n._)`new ${ValidationError2}(${names_1$3.default.vErrors})`));
    } else {
      gen.assign((0, codegen_1$n._)`${validateName}.errors`, names_1$3.default.vErrors);
      if (opts.unevaluated)
        assignEvaluated(it);
      gen.return((0, codegen_1$n._)`${names_1$3.default.errors} === 0`);
    }
  }
  function assignEvaluated({ gen, evaluated, props, items: items2 }) {
    if (props instanceof codegen_1$n.Name)
      gen.assign((0, codegen_1$n._)`${evaluated}.props`, props);
    if (items2 instanceof codegen_1$n.Name)
      gen.assign((0, codegen_1$n._)`${evaluated}.items`, items2);
  }
  function schemaKeywords(it, types2, typeErrors, errsCount) {
    const { gen, schema, data, allErrors, opts, self: self2 } = it;
    const { RULES } = self2;
    if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1$l.schemaHasRulesButRef)(schema, RULES))) {
      gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
      return;
    }
    if (!opts.jtd)
      checkStrictTypes(it, types2);
    gen.block(() => {
      for (const group of RULES.rules)
        groupKeywords(group);
      groupKeywords(RULES.post);
    });
    function groupKeywords(group) {
      if (!(0, applicability_1.shouldUseGroup)(schema, group))
        return;
      if (group.type) {
        gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
        iterateKeywords(it, group);
        if (types2.length === 1 && types2[0] === group.type && typeErrors) {
          gen.else();
          (0, dataType_2.reportTypeError)(it);
        }
        gen.endIf();
      } else {
        iterateKeywords(it, group);
      }
      if (!allErrors)
        gen.if((0, codegen_1$n._)`${names_1$3.default.errors} === ${errsCount || 0}`);
    }
  }
  function iterateKeywords(it, group) {
    const { gen, schema, opts: { useDefaults } } = it;
    if (useDefaults)
      (0, defaults_1.assignDefaults)(it, group.type);
    gen.block(() => {
      for (const rule of group.rules) {
        if ((0, applicability_1.shouldUseRule)(schema, rule)) {
          keywordCode(it, rule.keyword, rule.definition, group.type);
        }
      }
    });
  }
  function checkStrictTypes(it, types2) {
    if (it.schemaEnv.meta || !it.opts.strictTypes)
      return;
    checkContextTypes(it, types2);
    if (!it.opts.allowUnionTypes)
      checkMultipleTypes(it, types2);
    checkKeywordTypes(it, it.dataTypes);
  }
  function checkContextTypes(it, types2) {
    if (!types2.length)
      return;
    if (!it.dataTypes.length) {
      it.dataTypes = types2;
      return;
    }
    types2.forEach((t2) => {
      if (!includesType(it.dataTypes, t2)) {
        strictTypesError(it, `type "${t2}" not allowed by context "${it.dataTypes.join(",")}"`);
      }
    });
    narrowSchemaTypes(it, types2);
  }
  function checkMultipleTypes(it, ts) {
    if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
      strictTypesError(it, "use allowUnionTypes to allow union type keyword");
    }
  }
  function checkKeywordTypes(it, ts) {
    const rules2 = it.self.RULES.all;
    for (const keyword2 in rules2) {
      const rule = rules2[keyword2];
      if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
        const { type: type2 } = rule.definition;
        if (type2.length && !type2.some((t2) => hasApplicableType(ts, t2))) {
          strictTypesError(it, `missing type "${type2.join(",")}" for keyword "${keyword2}"`);
        }
      }
    }
  }
  function hasApplicableType(schTs, kwdT) {
    return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
  }
  function includesType(ts, t2) {
    return ts.includes(t2) || t2 === "integer" && ts.includes("number");
  }
  function narrowSchemaTypes(it, withTypes) {
    const ts = [];
    for (const t2 of it.dataTypes) {
      if (includesType(withTypes, t2))
        ts.push(t2);
      else if (withTypes.includes("integer") && t2 === "number")
        ts.push("integer");
    }
    it.dataTypes = ts;
  }
  function strictTypesError(it, msg) {
    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
    msg += ` at "${schemaPath}" (strictTypes)`;
    (0, util_1$l.checkStrictMode)(it, msg, it.opts.strictTypes);
  }
  class KeywordCxt {
    constructor(it, def2, keyword2) {
      (0, keyword_1.validateKeywordUsage)(it, def2, keyword2);
      this.gen = it.gen;
      this.allErrors = it.allErrors;
      this.keyword = keyword2;
      this.data = it.data;
      this.schema = it.schema[keyword2];
      this.$data = def2.$data && it.opts.$data && this.schema && this.schema.$data;
      this.schemaValue = (0, util_1$l.schemaRefOrVal)(it, this.schema, keyword2, this.$data);
      this.schemaType = def2.schemaType;
      this.parentSchema = it.schema;
      this.params = {};
      this.it = it;
      this.def = def2;
      if (this.$data) {
        this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
      } else {
        this.schemaCode = this.schemaValue;
        if (!(0, keyword_1.validSchemaType)(this.schema, def2.schemaType, def2.allowUndefined)) {
          throw new Error(`${keyword2} value must be ${JSON.stringify(def2.schemaType)}`);
        }
      }
      if ("code" in def2 ? def2.trackErrors : def2.errors !== false) {
        this.errsCount = it.gen.const("_errs", names_1$3.default.errors);
      }
    }
    result(condition, successAction, failAction) {
      this.failResult((0, codegen_1$n.not)(condition), successAction, failAction);
    }
    failResult(condition, successAction, failAction) {
      this.gen.if(condition);
      if (failAction)
        failAction();
      else
        this.error();
      if (successAction) {
        this.gen.else();
        successAction();
        if (this.allErrors)
          this.gen.endIf();
      } else {
        if (this.allErrors)
          this.gen.endIf();
        else
          this.gen.else();
      }
    }
    pass(condition, failAction) {
      this.failResult((0, codegen_1$n.not)(condition), void 0, failAction);
    }
    fail(condition) {
      if (condition === void 0) {
        this.error();
        if (!this.allErrors)
          this.gen.if(false);
        return;
      }
      this.gen.if(condition);
      this.error();
      if (this.allErrors)
        this.gen.endIf();
      else
        this.gen.else();
    }
    fail$data(condition) {
      if (!this.$data)
        return this.fail(condition);
      const { schemaCode } = this;
      this.fail((0, codegen_1$n._)`${schemaCode} !== undefined && (${(0, codegen_1$n.or)(this.invalid$data(), condition)})`);
    }
    error(append, errorParams, errorPaths) {
      if (errorParams) {
        this.setParams(errorParams);
        this._error(append, errorPaths);
        this.setParams({});
        return;
      }
      this._error(append, errorPaths);
    }
    _error(append, errorPaths) {
      (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
    }
    $dataError() {
      (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(cond) {
      if (!this.allErrors)
        this.gen.if(cond);
    }
    setParams(obj, assign) {
      if (assign)
        Object.assign(this.params, obj);
      else
        this.params = obj;
    }
    block$data(valid, codeBlock, $dataValid = codegen_1$n.nil) {
      this.gen.block(() => {
        this.check$data(valid, $dataValid);
        codeBlock();
      });
    }
    check$data(valid = codegen_1$n.nil, $dataValid = codegen_1$n.nil) {
      if (!this.$data)
        return;
      const { gen, schemaCode, schemaType, def: def2 } = this;
      gen.if((0, codegen_1$n.or)((0, codegen_1$n._)`${schemaCode} === undefined`, $dataValid));
      if (valid !== codegen_1$n.nil)
        gen.assign(valid, true);
      if (schemaType.length || def2.validateSchema) {
        gen.elseIf(this.invalid$data());
        this.$dataError();
        if (valid !== codegen_1$n.nil)
          gen.assign(valid, false);
      }
      gen.else();
    }
    invalid$data() {
      const { gen, schemaCode, schemaType, def: def2, it } = this;
      return (0, codegen_1$n.or)(wrong$DataType(), invalid$DataSchema());
      function wrong$DataType() {
        if (schemaType.length) {
          if (!(schemaCode instanceof codegen_1$n.Name))
            throw new Error("ajv implementation error");
          const st = Array.isArray(schemaType) ? schemaType : [schemaType];
          return (0, codegen_1$n._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
        }
        return codegen_1$n.nil;
      }
      function invalid$DataSchema() {
        if (def2.validateSchema) {
          const validateSchemaRef = gen.scopeValue("validate$data", { ref: def2.validateSchema });
          return (0, codegen_1$n._)`!${validateSchemaRef}(${schemaCode})`;
        }
        return codegen_1$n.nil;
      }
    }
    subschema(appl, valid) {
      const subschema2 = (0, subschema_1.getSubschema)(this.it, appl);
      (0, subschema_1.extendSubschemaData)(subschema2, this.it, appl);
      (0, subschema_1.extendSubschemaMode)(subschema2, appl);
      const nextContext = { ...this.it, ...subschema2, items: void 0, props: void 0 };
      subschemaCode(nextContext, valid);
      return nextContext;
    }
    mergeEvaluated(schemaCxt, toName) {
      const { it, gen } = this;
      if (!it.opts.unevaluated)
        return;
      if (it.props !== true && schemaCxt.props !== void 0) {
        it.props = util_1$l.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
      }
      if (it.items !== true && schemaCxt.items !== void 0) {
        it.items = util_1$l.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
      }
    }
    mergeValidEvaluated(schemaCxt, valid) {
      const { it, gen } = this;
      if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
        gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1$n.Name));
        return true;
      }
    }
  }
  validate.KeywordCxt = KeywordCxt;
  function keywordCode(it, keyword2, def2, ruleType) {
    const cxt = new KeywordCxt(it, def2, keyword2);
    if ("code" in def2) {
      def2.code(cxt, ruleType);
    } else if (cxt.$data && def2.validate) {
      (0, keyword_1.funcKeywordCode)(cxt, def2);
    } else if ("macro" in def2) {
      (0, keyword_1.macroKeywordCode)(cxt, def2);
    } else if (def2.compile || def2.validate) {
      (0, keyword_1.funcKeywordCode)(cxt, def2);
    }
  }
  const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
  const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function getData($data, { dataLevel, dataNames, dataPathArr }) {
    let jsonPointer;
    let data;
    if ($data === "")
      return names_1$3.default.rootData;
    if ($data[0] === "/") {
      if (!JSON_POINTER.test($data))
        throw new Error(`Invalid JSON-pointer: ${$data}`);
      jsonPointer = $data;
      data = names_1$3.default.rootData;
    } else {
      const matches = RELATIVE_JSON_POINTER.exec($data);
      if (!matches)
        throw new Error(`Invalid JSON-pointer: ${$data}`);
      const up = +matches[1];
      jsonPointer = matches[2];
      if (jsonPointer === "#") {
        if (up >= dataLevel)
          throw new Error(errorMsg("property/index", up));
        return dataPathArr[dataLevel - up];
      }
      if (up > dataLevel)
        throw new Error(errorMsg("data", up));
      data = dataNames[dataLevel - up];
      if (!jsonPointer)
        return data;
    }
    let expr = data;
    const segments = jsonPointer.split("/");
    for (const segment of segments) {
      if (segment) {
        data = (0, codegen_1$n._)`${data}${(0, codegen_1$n.getProperty)((0, util_1$l.unescapeJsonPointer)(segment))}`;
        expr = (0, codegen_1$n._)`${expr} && ${data}`;
      }
    }
    return expr;
    function errorMsg(pointerType, up) {
      return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
    }
  }
  validate.getData = getData;
  var validation_error = {};
  Object.defineProperty(validation_error, "__esModule", { value: true });
  class ValidationError extends Error {
    constructor(errors2) {
      super("validation failed");
      this.errors = errors2;
      this.ajv = this.validation = true;
    }
  }
  validation_error.default = ValidationError;
  var ref_error = {};
  Object.defineProperty(ref_error, "__esModule", { value: true });
  const resolve_1$1 = resolve$1;
  class MissingRefError extends Error {
    constructor(resolver, baseId, ref2, msg) {
      super(msg || `can't resolve reference ${ref2} from id ${baseId}`);
      this.missingRef = (0, resolve_1$1.resolveUrl)(resolver, baseId, ref2);
      this.missingSchema = (0, resolve_1$1.normalizeId)((0, resolve_1$1.getFullPath)(resolver, this.missingRef));
    }
  }
  ref_error.default = MissingRefError;
  var compile = {};
  Object.defineProperty(compile, "__esModule", { value: true });
  compile.resolveSchema = compile.getCompilingSchema = compile.resolveRef = compile.compileSchema = compile.SchemaEnv = void 0;
  const codegen_1$m = codegen;
  const validation_error_1 = validation_error;
  const names_1$2 = names$1;
  const resolve_1 = resolve$1;
  const util_1$k = util;
  const validate_1$1 = validate;
  class SchemaEnv {
    constructor(env) {
      var _a;
      this.refs = {};
      this.dynamicAnchors = {};
      let schema;
      if (typeof env.schema == "object")
        schema = env.schema;
      this.schema = env.schema;
      this.schemaId = env.schemaId;
      this.root = env.root || this;
      this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
      this.schemaPath = env.schemaPath;
      this.localRefs = env.localRefs;
      this.meta = env.meta;
      this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
      this.refs = {};
    }
  }
  compile.SchemaEnv = SchemaEnv;
  function compileSchema(sch) {
    const _sch = getCompilingSchema.call(this, sch);
    if (_sch)
      return _sch;
    const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
    const { es5, lines } = this.opts.code;
    const { ownProperties } = this.opts;
    const gen = new codegen_1$m.CodeGen(this.scope, { es5, lines, ownProperties });
    let _ValidationError;
    if (sch.$async) {
      _ValidationError = gen.scopeValue("Error", {
        ref: validation_error_1.default,
        code: (0, codegen_1$m._)`require("ajv/dist/runtime/validation_error").default`
      });
    }
    const validateName = gen.scopeName("validate");
    sch.validateName = validateName;
    const schemaCxt = {
      gen,
      allErrors: this.opts.allErrors,
      data: names_1$2.default.data,
      parentData: names_1$2.default.parentData,
      parentDataProperty: names_1$2.default.parentDataProperty,
      dataNames: [names_1$2.default.data],
      dataPathArr: [codegen_1$m.nil],
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1$m.stringify)(sch.schema) } : { ref: sch.schema }),
      validateName,
      ValidationError: _ValidationError,
      schema: sch.schema,
      schemaEnv: sch,
      rootId,
      baseId: sch.baseId || rootId,
      schemaPath: codegen_1$m.nil,
      errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, codegen_1$m._)`""`,
      opts: this.opts,
      self: this
    };
    let sourceCode;
    try {
      this._compilations.add(sch);
      (0, validate_1$1.validateFunctionCode)(schemaCxt);
      gen.optimize(this.opts.code.optimize);
      const validateCode = gen.toString();
      sourceCode = `${gen.scopeRefs(names_1$2.default.scope)}return ${validateCode}`;
      if (this.opts.code.process)
        sourceCode = this.opts.code.process(sourceCode, sch);
      const makeValidate = new Function(`${names_1$2.default.self}`, `${names_1$2.default.scope}`, sourceCode);
      const validate2 = makeValidate(this, this.scope.get());
      this.scope.value(validateName, { ref: validate2 });
      validate2.errors = null;
      validate2.schema = sch.schema;
      validate2.schemaEnv = sch;
      if (sch.$async)
        validate2.$async = true;
      if (this.opts.code.source === true) {
        validate2.source = { validateName, validateCode, scopeValues: gen._values };
      }
      if (this.opts.unevaluated) {
        const { props, items: items2 } = schemaCxt;
        validate2.evaluated = {
          props: props instanceof codegen_1$m.Name ? void 0 : props,
          items: items2 instanceof codegen_1$m.Name ? void 0 : items2,
          dynamicProps: props instanceof codegen_1$m.Name,
          dynamicItems: items2 instanceof codegen_1$m.Name
        };
        if (validate2.source)
          validate2.source.evaluated = (0, codegen_1$m.stringify)(validate2.evaluated);
      }
      sch.validate = validate2;
      return sch;
    } catch (e) {
      delete sch.validate;
      delete sch.validateName;
      if (sourceCode)
        this.logger.error("Error compiling schema, function code:", sourceCode);
      throw e;
    } finally {
      this._compilations.delete(sch);
    }
  }
  compile.compileSchema = compileSchema;
  function resolveRef(root, baseId, ref2) {
    var _a;
    ref2 = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref2);
    const schOrFunc = root.refs[ref2];
    if (schOrFunc)
      return schOrFunc;
    let _sch = resolve.call(this, root, ref2);
    if (_sch === void 0) {
      const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref2];
      const { schemaId } = this.opts;
      if (schema)
        _sch = new SchemaEnv({ schema, schemaId, root, baseId });
    }
    if (_sch === void 0)
      return;
    return root.refs[ref2] = inlineOrCompile.call(this, _sch);
  }
  compile.resolveRef = resolveRef;
  function inlineOrCompile(sch) {
    if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
      return sch.schema;
    return sch.validate ? sch : compileSchema.call(this, sch);
  }
  function getCompilingSchema(schEnv) {
    for (const sch of this._compilations) {
      if (sameSchemaEnv(sch, schEnv))
        return sch;
    }
  }
  compile.getCompilingSchema = getCompilingSchema;
  function sameSchemaEnv(s1, s2) {
    return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
  }
  function resolve(root, ref2) {
    let sch;
    while (typeof (sch = this.refs[ref2]) == "string")
      ref2 = sch;
    return sch || this.schemas[ref2] || resolveSchema.call(this, root, ref2);
  }
  function resolveSchema(root, ref2) {
    const p = this.opts.uriResolver.parse(ref2);
    const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
    let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
    if (Object.keys(root.schema).length > 0 && refPath === baseId) {
      return getJsonPointer.call(this, p, root);
    }
    const id2 = (0, resolve_1.normalizeId)(refPath);
    const schOrRef = this.refs[id2] || this.schemas[id2];
    if (typeof schOrRef == "string") {
      const sch = resolveSchema.call(this, root, schOrRef);
      if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
        return;
      return getJsonPointer.call(this, p, sch);
    }
    if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
      return;
    if (!schOrRef.validate)
      compileSchema.call(this, schOrRef);
    if (id2 === (0, resolve_1.normalizeId)(ref2)) {
      const { schema } = schOrRef;
      const { schemaId } = this.opts;
      const schId = schema[schemaId];
      if (schId)
        baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
      return new SchemaEnv({ schema, schemaId, root, baseId });
    }
    return getJsonPointer.call(this, p, schOrRef);
  }
  compile.resolveSchema = resolveSchema;
  const PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function getJsonPointer(parsedRef, { baseId, schema, root }) {
    var _a;
    if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
      return;
    for (const part of parsedRef.fragment.slice(1).split("/")) {
      if (typeof schema === "boolean")
        return;
      const partSchema = schema[(0, util_1$k.unescapeFragment)(part)];
      if (partSchema === void 0)
        return;
      schema = partSchema;
      const schId = typeof schema === "object" && schema[this.opts.schemaId];
      if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
        baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
      }
    }
    let env;
    if (typeof schema != "boolean" && schema.$ref && !(0, util_1$k.schemaHasRulesButRef)(schema, this.RULES)) {
      const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
      env = resolveSchema.call(this, root, $ref);
    }
    const { schemaId } = this.opts;
    env = env || new SchemaEnv({ schema, schemaId, root, baseId });
    if (env.schema !== env.root.schema)
      return env;
    return void 0;
  }
  const $id$1 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#";
  const description = "Meta-schema for $data reference (JSON AnySchema extension proposal)";
  const type$1 = "object";
  const required$1 = [
    "$data"
  ];
  const properties$2 = {
    $data: {
      type: "string",
      anyOf: [
        {
          format: "relative-json-pointer"
        },
        {
          format: "json-pointer"
        }
      ]
    }
  };
  const additionalProperties$1 = false;
  const require$$9 = {
    $id: $id$1,
    description,
    type: type$1,
    required: required$1,
    properties: properties$2,
    additionalProperties: additionalProperties$1
  };
  var uri$1 = {};
  var uri_all = { exports: {} };
  /** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
  (function(module, exports) {
    (function(global2, factory) {
      factory(exports);
    })(commonjsGlobal, function(exports2) {
      function merge() {
        for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
          sets[_key] = arguments[_key];
        }
        if (sets.length > 1) {
          sets[0] = sets[0].slice(0, -1);
          var xl = sets.length - 1;
          for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
          }
          sets[xl] = sets[xl].slice(1);
          return sets.join("");
        } else {
          return sets[0];
        }
      }
      function subexp(str) {
        return "(?:" + str + ")";
      }
      function typeOf(o) {
        return o === void 0 ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
      }
      function toUpperCase(str) {
        return str.toUpperCase();
      }
      function toArray(obj) {
        return obj !== void 0 && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
      }
      function assign(target, source) {
        var obj = target;
        if (source) {
          for (var key in source) {
            obj[key] = source[key];
          }
        }
        return obj;
      }
      function buildExps(isIRI) {
        var ALPHA$$ = "[A-Za-z]", DIGIT$$ = "[0-9]", HEXDIG$$2 = merge(DIGIT$$, "[A-Fa-f]"), PCT_ENCODED$2 = subexp(subexp("%[EFef]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%" + HEXDIG$$2 + HEXDIG$$2)), GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]", SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$), UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]", UNRESERVED$$2 = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$);
        subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*");
        subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]")) + "*");
        var DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$), IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$), H16$ = subexp(HEXDIG$$2 + "{1,4}"), LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$), IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$), IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$), IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$), IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$), IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$), IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$), IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$), IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$), IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"), IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")), ZONEID$ = subexp(subexp(UNRESERVED$$2 + "|" + PCT_ENCODED$2) + "+");
        subexp("[vV]" + HEXDIG$$2 + "+\\." + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]") + "+");
        subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$)) + "*");
        var PCHAR$ = subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@]"));
        subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\@]")) + "+");
        subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*");
        return {
          NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
          NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
          NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
          ESCAPE: new RegExp(merge("[^]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          UNRESERVED: new RegExp(UNRESERVED$$2, "g"),
          OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$2, RESERVED$$), "g"),
          PCT_ENCODED: new RegExp(PCT_ENCODED$2, "g"),
          IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
          IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$")
          //RFC 6874, with relaxed parsing rules
        };
      }
      var URI_PROTOCOL = buildExps(false);
      var IRI_PROTOCOL = buildExps(true);
      var slicedToArray = /* @__PURE__ */ function() {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"])
                _i["return"]();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        }
        return function(arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();
      var toConsumableArray = function(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
            arr2[i] = arr[i];
          return arr2;
        } else {
          return Array.from(arr);
        }
      };
      var maxInt = 2147483647;
      var base = 36;
      var tMin = 1;
      var tMax = 26;
      var skew = 38;
      var damp = 700;
      var initialBias = 72;
      var initialN = 128;
      var delimiter = "-";
      var regexPunycode = /^xn--/;
      var regexNonASCII = /[^\0-\x7E]/;
      var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
      var errors2 = {
        "overflow": "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      };
      var baseMinusTMin = base - tMin;
      var floor = Math.floor;
      var stringFromCharCode = String.fromCharCode;
      function error$12(type2) {
        throw new RangeError(errors2[type2]);
      }
      function map(array, fn) {
        var result = [];
        var length = array.length;
        while (length--) {
          result[length] = fn(array[length]);
        }
        return result;
      }
      function mapDomain(string, fn) {
        var parts = string.split("@");
        var result = "";
        if (parts.length > 1) {
          result = parts[0] + "@";
          string = parts[1];
        }
        string = string.replace(regexSeparators, ".");
        var labels = string.split(".");
        var encoded = map(labels, fn).join(".");
        return result + encoded;
      }
      function ucs2decode(string) {
        var output = [];
        var counter = 0;
        var length = string.length;
        while (counter < length) {
          var value = string.charCodeAt(counter++);
          if (value >= 55296 && value <= 56319 && counter < length) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
            } else {
              output.push(value);
              counter--;
            }
          } else {
            output.push(value);
          }
        }
        return output;
      }
      var ucs2encode = function ucs2encode2(array) {
        return String.fromCodePoint.apply(String, toConsumableArray(array));
      };
      var basicToDigit = function basicToDigit2(codePoint) {
        if (codePoint - 48 < 10) {
          return codePoint - 22;
        }
        if (codePoint - 65 < 26) {
          return codePoint - 65;
        }
        if (codePoint - 97 < 26) {
          return codePoint - 97;
        }
        return base;
      };
      var digitToBasic = function digitToBasic2(digit, flag) {
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
      };
      var adapt = function adapt2(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for (
          ;
          /* no initialization */
          delta > baseMinusTMin * tMax >> 1;
          k += base
        ) {
          delta = floor(delta / baseMinusTMin);
        }
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
      };
      var decode = function decode2(input) {
        var output = [];
        var inputLength = input.length;
        var i = 0;
        var n = initialN;
        var bias = initialBias;
        var basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
          basic = 0;
        }
        for (var j = 0; j < basic; ++j) {
          if (input.charCodeAt(j) >= 128) {
            error$12("not-basic");
          }
          output.push(input.charCodeAt(j));
        }
        for (var index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
          var oldi = i;
          for (
            var w = 1, k = base;
            ;
            /* no condition */
            k += base
          ) {
            if (index >= inputLength) {
              error$12("invalid-input");
            }
            var digit = basicToDigit(input.charCodeAt(index++));
            if (digit >= base || digit > floor((maxInt - i) / w)) {
              error$12("overflow");
            }
            i += digit * w;
            var t2 = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (digit < t2) {
              break;
            }
            var baseMinusT = base - t2;
            if (w > floor(maxInt / baseMinusT)) {
              error$12("overflow");
            }
            w *= baseMinusT;
          }
          var out = output.length + 1;
          bias = adapt(i - oldi, out, oldi == 0);
          if (floor(i / out) > maxInt - n) {
            error$12("overflow");
          }
          n += floor(i / out);
          i %= out;
          output.splice(i++, 0, n);
        }
        return String.fromCodePoint.apply(String, output);
      };
      var encode = function encode2(input) {
        var output = [];
        input = ucs2decode(input);
        var inputLength = input.length;
        var n = initialN;
        var delta = 0;
        var bias = initialBias;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _currentValue2 = _step.value;
            if (_currentValue2 < 128) {
              output.push(stringFromCharCode(_currentValue2));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        var basicLength = output.length;
        var handledCPCount = basicLength;
        if (basicLength) {
          output.push(delimiter);
        }
        while (handledCPCount < inputLength) {
          var m = maxInt;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = void 0;
          try {
            for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var currentValue = _step2.value;
              if (currentValue >= n && currentValue < m) {
                m = currentValue;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
          var handledCPCountPlusOne = handledCPCount + 1;
          if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
            error$12("overflow");
          }
          delta += (m - n) * handledCPCountPlusOne;
          n = m;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = void 0;
          try {
            for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _currentValue = _step3.value;
              if (_currentValue < n && ++delta > maxInt) {
                error$12("overflow");
              }
              if (_currentValue == n) {
                var q = delta;
                for (
                  var k = base;
                  ;
                  /* no condition */
                  k += base
                ) {
                  var t2 = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (q < t2) {
                    break;
                  }
                  var qMinusT = q - t2;
                  var baseMinusT = base - t2;
                  output.push(stringFromCharCode(digitToBasic(t2 + qMinusT % baseMinusT, 0)));
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
          ++delta;
          ++n;
        }
        return output.join("");
      };
      var toUnicode = function toUnicode2(input) {
        return mapDomain(input, function(string) {
          return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
      };
      var toASCII = function toASCII2(input) {
        return mapDomain(input, function(string) {
          return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
        });
      };
      var punycode = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        "version": "2.1.0",
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        "ucs2": {
          "decode": ucs2decode,
          "encode": ucs2encode
        },
        "decode": decode,
        "encode": encode,
        "toASCII": toASCII,
        "toUnicode": toUnicode
      };
      var SCHEMES = {};
      function pctEncChar(chr) {
        var c = chr.charCodeAt(0);
        var e = void 0;
        if (c < 16)
          e = "%0" + c.toString(16).toUpperCase();
        else if (c < 128)
          e = "%" + c.toString(16).toUpperCase();
        else if (c < 2048)
          e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        else
          e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        return e;
      }
      function pctDecChars(str) {
        var newStr = "";
        var i = 0;
        var il = str.length;
        while (i < il) {
          var c = parseInt(str.substr(i + 1, 2), 16);
          if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
          } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
              var c2 = parseInt(str.substr(i + 4, 2), 16);
              newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
              newStr += str.substr(i, 6);
            }
            i += 6;
          } else if (c >= 224) {
            if (il - i >= 9) {
              var _c = parseInt(str.substr(i + 4, 2), 16);
              var c3 = parseInt(str.substr(i + 7, 2), 16);
              newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
              newStr += str.substr(i, 9);
            }
            i += 9;
          } else {
            newStr += str.substr(i, 3);
            i += 3;
          }
        }
        return newStr;
      }
      function _normalizeComponentEncoding(components, protocol) {
        function decodeUnreserved2(str) {
          var decStr = pctDecChars(str);
          return !decStr.match(protocol.UNRESERVED) ? str : decStr;
        }
        if (components.scheme)
          components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_SCHEME, "");
        if (components.userinfo !== void 0)
          components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.host !== void 0)
          components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.path !== void 0)
          components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.query !== void 0)
          components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.fragment !== void 0)
          components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        return components;
      }
      function _stripLeadingZeros(str) {
        return str.replace(/^0*(.*)/, "$1") || "0";
      }
      function _normalizeIPv4(host, protocol) {
        var matches = host.match(protocol.IPV4ADDRESS) || [];
        var _matches = slicedToArray(matches, 2), address = _matches[1];
        if (address) {
          return address.split(".").map(_stripLeadingZeros).join(".");
        } else {
          return host;
        }
      }
      function _normalizeIPv6(host, protocol) {
        var matches = host.match(protocol.IPV6ADDRESS) || [];
        var _matches2 = slicedToArray(matches, 3), address = _matches2[1], zone = _matches2[2];
        if (address) {
          var _address$toLowerCase$ = address.toLowerCase().split("::").reverse(), _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2), last = _address$toLowerCase$2[0], first = _address$toLowerCase$2[1];
          var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
          var lastFields = last.split(":").map(_stripLeadingZeros);
          var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
          var fieldCount = isLastFieldIPv4Address ? 7 : 8;
          var lastFieldsStart = lastFields.length - fieldCount;
          var fields = Array(fieldCount);
          for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || "";
          }
          if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
          }
          var allZeroFields = fields.reduce(function(acc, field, index) {
            if (!field || field === "0") {
              var lastLongest = acc[acc.length - 1];
              if (lastLongest && lastLongest.index + lastLongest.length === index) {
                lastLongest.length++;
              } else {
                acc.push({ index, length: 1 });
              }
            }
            return acc;
          }, []);
          var longestZeroFields = allZeroFields.sort(function(a, b) {
            return b.length - a.length;
          })[0];
          var newHost = void 0;
          if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
          } else {
            newHost = fields.join(":");
          }
          if (zone) {
            newHost += "%" + zone;
          }
          return newHost;
        } else {
          return host;
        }
      }
      var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
      var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === void 0;
      function parse(uriString) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var components = {};
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        if (options.reference === "suffix")
          uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
        var matches = uriString.match(URI_PARSE);
        if (matches) {
          if (NO_MATCH_IS_UNDEFINED) {
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            if (isNaN(components.port)) {
              components.port = matches[5];
            }
          } else {
            components.scheme = matches[1] || void 0;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : void 0;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : void 0;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : void 0;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : void 0;
            if (isNaN(components.port)) {
              components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : void 0;
            }
          }
          if (components.host) {
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
          }
          if (components.scheme === void 0 && components.userinfo === void 0 && components.host === void 0 && components.port === void 0 && !components.path && components.query === void 0) {
            components.reference = "same-document";
          } else if (components.scheme === void 0) {
            components.reference = "relative";
          } else if (components.fragment === void 0) {
            components.reference = "absolute";
          } else {
            components.reference = "uri";
          }
          if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
          }
          var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
          if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
              try {
                components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
              } catch (e) {
                components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
              }
            }
            _normalizeComponentEncoding(components, URI_PROTOCOL);
          } else {
            _normalizeComponentEncoding(components, protocol);
          }
          if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
          }
        } else {
          components.error = components.error || "URI can not be parsed.";
        }
        return components;
      }
      function _recomposeAuthority(components, options) {
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        if (components.userinfo !== void 0) {
          uriTokens.push(components.userinfo);
          uriTokens.push("@");
        }
        if (components.host !== void 0) {
          uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function(_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
          }));
        }
        if (typeof components.port === "number" || typeof components.port === "string") {
          uriTokens.push(":");
          uriTokens.push(String(components.port));
        }
        return uriTokens.length ? uriTokens.join("") : void 0;
      }
      var RDS1 = /^\.\.?\//;
      var RDS2 = /^\/\.(\/|$)/;
      var RDS3 = /^\/\.\.(\/|$)/;
      var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
      function removeDotSegments(input) {
        var output = [];
        while (input.length) {
          if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
          } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
          } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
          } else if (input === "." || input === "..") {
            input = "";
          } else {
            var im = input.match(RDS5);
            if (im) {
              var s = im[0];
              input = input.slice(s.length);
              output.push(s);
            } else {
              throw new Error("Unexpected dot segment condition");
            }
          }
        }
        return output.join("");
      }
      function serialize(components) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        if (schemeHandler && schemeHandler.serialize)
          schemeHandler.serialize(components, options);
        if (components.host) {
          if (protocol.IPV6ADDRESS.test(components.host))
            ;
          else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
            try {
              components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
            } catch (e) {
              components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
            }
          }
        }
        _normalizeComponentEncoding(components, protocol);
        if (options.reference !== "suffix" && components.scheme) {
          uriTokens.push(components.scheme);
          uriTokens.push(":");
        }
        var authority = _recomposeAuthority(components, options);
        if (authority !== void 0) {
          if (options.reference !== "suffix") {
            uriTokens.push("//");
          }
          uriTokens.push(authority);
          if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
          }
        }
        if (components.path !== void 0) {
          var s = components.path;
          if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
          }
          if (authority === void 0) {
            s = s.replace(/^\/\//, "/%2F");
          }
          uriTokens.push(s);
        }
        if (components.query !== void 0) {
          uriTokens.push("?");
          uriTokens.push(components.query);
        }
        if (components.fragment !== void 0) {
          uriTokens.push("#");
          uriTokens.push(components.fragment);
        }
        return uriTokens.join("");
      }
      function resolveComponents(base2, relative) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var skipNormalization = arguments[3];
        var target = {};
        if (!skipNormalization) {
          base2 = parse(serialize(base2, options), options);
          relative = parse(serialize(relative, options), options);
        }
        options = options || {};
        if (!options.tolerant && relative.scheme) {
          target.scheme = relative.scheme;
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
          } else {
            if (!relative.path) {
              target.path = base2.path;
              if (relative.query !== void 0) {
                target.query = relative.query;
              } else {
                target.query = base2.query;
              }
            } else {
              if (relative.path.charAt(0) === "/") {
                target.path = removeDotSegments(relative.path);
              } else {
                if ((base2.userinfo !== void 0 || base2.host !== void 0 || base2.port !== void 0) && !base2.path) {
                  target.path = "/" + relative.path;
                } else if (!base2.path) {
                  target.path = relative.path;
                } else {
                  target.path = base2.path.slice(0, base2.path.lastIndexOf("/") + 1) + relative.path;
                }
                target.path = removeDotSegments(target.path);
              }
              target.query = relative.query;
            }
            target.userinfo = base2.userinfo;
            target.host = base2.host;
            target.port = base2.port;
          }
          target.scheme = base2.scheme;
        }
        target.fragment = relative.fragment;
        return target;
      }
      function resolve2(baseURI, relativeURI, options) {
        var schemelessOptions = assign({ scheme: "null" }, options);
        return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
      }
      function normalize(uri2, options) {
        if (typeof uri2 === "string") {
          uri2 = serialize(parse(uri2, options), options);
        } else if (typeOf(uri2) === "object") {
          uri2 = parse(serialize(uri2, options), options);
        }
        return uri2;
      }
      function equal2(uriA, uriB, options) {
        if (typeof uriA === "string") {
          uriA = serialize(parse(uriA, options), options);
        } else if (typeOf(uriA) === "object") {
          uriA = serialize(uriA, options);
        }
        if (typeof uriB === "string") {
          uriB = serialize(parse(uriB, options), options);
        } else if (typeOf(uriB) === "object") {
          uriB = serialize(uriB, options);
        }
        return uriA === uriB;
      }
      function escapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
      }
      function unescapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
      }
      var handler = {
        scheme: "http",
        domainHost: true,
        parse: function parse2(components, options) {
          if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
          }
          return components;
        },
        serialize: function serialize2(components, options) {
          var secure = String(components.scheme).toLowerCase() === "https";
          if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = void 0;
          }
          if (!components.path) {
            components.path = "/";
          }
          return components;
        }
      };
      var handler$1 = {
        scheme: "https",
        domainHost: handler.domainHost,
        parse: handler.parse,
        serialize: handler.serialize
      };
      function isSecure(wsComponents) {
        return typeof wsComponents.secure === "boolean" ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
      }
      var handler$2 = {
        scheme: "ws",
        domainHost: true,
        parse: function parse2(components, options) {
          var wsComponents = components;
          wsComponents.secure = isSecure(wsComponents);
          wsComponents.resourceName = (wsComponents.path || "/") + (wsComponents.query ? "?" + wsComponents.query : "");
          wsComponents.path = void 0;
          wsComponents.query = void 0;
          return wsComponents;
        },
        serialize: function serialize2(wsComponents, options) {
          if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = void 0;
          }
          if (typeof wsComponents.secure === "boolean") {
            wsComponents.scheme = wsComponents.secure ? "wss" : "ws";
            wsComponents.secure = void 0;
          }
          if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split("?"), _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2), path = _wsComponents$resourc2[0], query = _wsComponents$resourc2[1];
            wsComponents.path = path && path !== "/" ? path : void 0;
            wsComponents.query = query;
            wsComponents.resourceName = void 0;
          }
          wsComponents.fragment = void 0;
          return wsComponents;
        }
      };
      var handler$3 = {
        scheme: "wss",
        domainHost: handler$2.domainHost,
        parse: handler$2.parse,
        serialize: handler$2.serialize
      };
      var O = {};
      var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]";
      var HEXDIG$$ = "[0-9A-Fa-f]";
      var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$));
      var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
      var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
      var VCHAR$$ = merge(QTEXT$$, '[\\"\\\\]');
      var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
      var UNRESERVED = new RegExp(UNRESERVED$$, "g");
      var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
      var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
      var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
      var NOT_HFVALUE = NOT_HFNAME;
      function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(UNRESERVED) ? str : decStr;
      }
      var handler$4 = {
        scheme: "mailto",
        parse: function parse$$1(components, options) {
          var mailtoComponents = components;
          var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
          mailtoComponents.path = void 0;
          if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
              var hfield = hfields[x].split("=");
              switch (hfield[0]) {
                case "to":
                  var toAddrs = hfield[1].split(",");
                  for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                    to.push(toAddrs[_x]);
                  }
                  break;
                case "subject":
                  mailtoComponents.subject = unescapeComponent(hfield[1], options);
                  break;
                case "body":
                  mailtoComponents.body = unescapeComponent(hfield[1], options);
                  break;
                default:
                  unknownHeaders = true;
                  headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                  break;
              }
            }
            if (unknownHeaders)
              mailtoComponents.headers = headers;
          }
          mailtoComponents.query = void 0;
          for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
              try {
                addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
              } catch (e) {
                mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
              }
            } else {
              addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
          }
          return mailtoComponents;
        },
        serialize: function serialize$$1(mailtoComponents, options) {
          var components = mailtoComponents;
          var to = toArray(mailtoComponents.to);
          if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
              var toAddr = String(to[x]);
              var atIdx = toAddr.lastIndexOf("@");
              var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
              var domain = toAddr.slice(atIdx + 1);
              try {
                domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
              } catch (e) {
                components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
              }
              to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
          }
          var headers = mailtoComponents.headers = mailtoComponents.headers || {};
          if (mailtoComponents.subject)
            headers["subject"] = mailtoComponents.subject;
          if (mailtoComponents.body)
            headers["body"] = mailtoComponents.body;
          var fields = [];
          for (var name in headers) {
            if (headers[name] !== O[name]) {
              fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
          }
          if (fields.length) {
            components.query = fields.join("&");
          }
          return components;
        }
      };
      var URN_PARSE = /^([^\:]+)\:(.*)/;
      var handler$5 = {
        scheme: "urn",
        parse: function parse$$1(components, options) {
          var matches = components.path && components.path.match(URN_PARSE);
          var urnComponents = components;
          if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = void 0;
            if (schemeHandler) {
              urnComponents = schemeHandler.parse(urnComponents, options);
            }
          } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
          }
          return urnComponents;
        },
        serialize: function serialize$$1(urnComponents, options) {
          var scheme = options.scheme || urnComponents.scheme || "urn";
          var nid = urnComponents.nid;
          var urnScheme = scheme + ":" + (options.nid || nid);
          var schemeHandler = SCHEMES[urnScheme];
          if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
          }
          var uriComponents = urnComponents;
          var nss = urnComponents.nss;
          uriComponents.path = (nid || options.nid) + ":" + nss;
          return uriComponents;
        }
      };
      var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
      var handler$6 = {
        scheme: "urn:uuid",
        parse: function parse2(urnComponents, options) {
          var uuidComponents = urnComponents;
          uuidComponents.uuid = uuidComponents.nss;
          uuidComponents.nss = void 0;
          if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
          }
          return uuidComponents;
        },
        serialize: function serialize2(uuidComponents, options) {
          var urnComponents = uuidComponents;
          urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
          return urnComponents;
        }
      };
      SCHEMES[handler.scheme] = handler;
      SCHEMES[handler$1.scheme] = handler$1;
      SCHEMES[handler$2.scheme] = handler$2;
      SCHEMES[handler$3.scheme] = handler$3;
      SCHEMES[handler$4.scheme] = handler$4;
      SCHEMES[handler$5.scheme] = handler$5;
      SCHEMES[handler$6.scheme] = handler$6;
      exports2.SCHEMES = SCHEMES;
      exports2.pctEncChar = pctEncChar;
      exports2.pctDecChars = pctDecChars;
      exports2.parse = parse;
      exports2.removeDotSegments = removeDotSegments;
      exports2.serialize = serialize;
      exports2.resolveComponents = resolveComponents;
      exports2.resolve = resolve2;
      exports2.normalize = normalize;
      exports2.equal = equal2;
      exports2.escapeComponent = escapeComponent;
      exports2.unescapeComponent = unescapeComponent;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  })(uri_all, uri_all.exports);
  var uri_allExports = uri_all.exports;
  Object.defineProperty(uri$1, "__esModule", { value: true });
  const uri = uri_allExports;
  uri.code = 'require("ajv/dist/runtime/uri").default';
  uri$1.default = uri;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
    var validate_12 = validate;
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_12.KeywordCxt;
    } });
    var codegen_12 = codegen;
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_12._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_12.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_12.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_12.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_12.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_12.CodeGen;
    } });
    const validation_error_12 = validation_error;
    const ref_error_12 = ref_error;
    const rules_1 = rules;
    const compile_12 = compile;
    const codegen_2 = codegen;
    const resolve_12 = resolve$1;
    const dataType_12 = dataType;
    const util_12 = util;
    const $dataRefSchema = require$$9;
    const uri_1 = uri$1;
    const defaultRegExp = (str, flags) => new RegExp(str, flags);
    defaultRegExp.code = "new RegExp";
    const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
    const EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]);
    const removedOptions = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    };
    const deprecatedOptions = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    };
    const MAX_EXPRESSION = 200;
    function requiredOptions(o) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
      const s = o.strict;
      const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
      const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
      const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
      const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
      return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver
      };
    }
    class Ajv {
      constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = /* @__PURE__ */ new Set();
        this._loading = {};
        this._cache = /* @__PURE__ */ new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
          addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
          addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
          this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
          _dataRefSchema = { ...$dataRefSchema };
          _dataRefSchema.id = _dataRefSchema.$id;
          delete _dataRefSchema.$id;
        }
        if (meta && $data)
          this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
      }
      defaultMeta() {
        const { meta, schemaId } = this.opts;
        return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
      }
      validate(schemaKeyRef, data) {
        let v;
        if (typeof schemaKeyRef == "string") {
          v = this.getSchema(schemaKeyRef);
          if (!v)
            throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        } else {
          v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
          this.errors = v.errors;
        return valid;
      }
      compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
      }
      compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
          throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
          await loadMetaSchema.call(this, _schema.$schema);
          const sch = this._addSchema(_schema, _meta);
          return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
          if ($ref && !this.getSchema($ref)) {
            await runCompileAsync.call(this, { $ref }, true);
          }
        }
        async function _compileAsync(sch) {
          try {
            return this._compileSchemaEnv(sch);
          } catch (e) {
            if (!(e instanceof ref_error_12.default))
              throw e;
            checkLoaded.call(this, e);
            await loadMissingSchema.call(this, e.missingSchema);
            return _compileAsync.call(this, sch);
          }
        }
        function checkLoaded({ missingSchema: ref2, missingRef }) {
          if (this.refs[ref2]) {
            throw new Error(`AnySchema ${ref2} is loaded but ${missingRef} cannot be resolved`);
          }
        }
        async function loadMissingSchema(ref2) {
          const _schema = await _loadSchema.call(this, ref2);
          if (!this.refs[ref2])
            await loadMetaSchema.call(this, _schema.$schema);
          if (!this.refs[ref2])
            this.addSchema(_schema, ref2, meta);
        }
        async function _loadSchema(ref2) {
          const p = this._loading[ref2];
          if (p)
            return p;
          try {
            return await (this._loading[ref2] = loadSchema(ref2));
          } finally {
            delete this._loading[ref2];
          }
        }
      }
      // Adds schema to the instance
      addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
        if (Array.isArray(schema)) {
          for (const sch of schema)
            this.addSchema(sch, void 0, _meta, _validateSchema);
          return this;
        }
        let id2;
        if (typeof schema === "object") {
          const { schemaId } = this.opts;
          id2 = schema[schemaId];
          if (id2 !== void 0 && typeof id2 != "string") {
            throw new Error(`schema ${schemaId} must be string`);
          }
        }
        key = (0, resolve_12.normalizeId)(key || id2);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
      }
      //  Validate schema against its meta-schema
      validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
          return true;
        let $schema2;
        $schema2 = schema.$schema;
        if ($schema2 !== void 0 && typeof $schema2 != "string") {
          throw new Error("$schema must be a string");
        }
        $schema2 = $schema2 || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema2) {
          this.logger.warn("meta-schema not available");
          this.errors = null;
          return true;
        }
        const valid = this.validate($schema2, schema);
        if (!valid && throwOrLogError) {
          const message = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(message);
          else
            throw new Error(message);
        }
        return valid;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
          keyRef = sch;
        if (sch === void 0) {
          const { schemaId } = this.opts;
          const root = new compile_12.SchemaEnv({ schema: {}, schemaId });
          sch = compile_12.resolveSchema.call(this, root, keyRef);
          if (!sch)
            return;
          this.refs[keyRef] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
          this._removeAllSchemas(this.schemas, schemaKeyRef);
          this._removeAllSchemas(this.refs, schemaKeyRef);
          return this;
        }
        switch (typeof schemaKeyRef) {
          case "undefined":
            this._removeAllSchemas(this.schemas);
            this._removeAllSchemas(this.refs);
            this._cache.clear();
            return this;
          case "string": {
            const sch = getSchEnv.call(this, schemaKeyRef);
            if (typeof sch == "object")
              this._cache.delete(sch.schema);
            delete this.schemas[schemaKeyRef];
            delete this.refs[schemaKeyRef];
            return this;
          }
          case "object": {
            const cacheKey = schemaKeyRef;
            this._cache.delete(cacheKey);
            let id2 = schemaKeyRef[this.opts.schemaId];
            if (id2) {
              id2 = (0, resolve_12.normalizeId)(id2);
              delete this.schemas[id2];
              delete this.refs[id2];
            }
            return this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(definitions2) {
        for (const def2 of definitions2)
          this.addKeyword(def2);
        return this;
      }
      addKeyword(kwdOrDef, def2) {
        let keyword2;
        if (typeof kwdOrDef == "string") {
          keyword2 = kwdOrDef;
          if (typeof def2 == "object") {
            this.logger.warn("these parameters are deprecated, see docs for addKeyword");
            def2.keyword = keyword2;
          }
        } else if (typeof kwdOrDef == "object" && def2 === void 0) {
          def2 = kwdOrDef;
          keyword2 = def2.keyword;
          if (Array.isArray(keyword2) && !keyword2.length) {
            throw new Error("addKeywords: keyword must be string or non-empty array");
          }
        } else {
          throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword2, def2);
        if (!def2) {
          (0, util_12.eachItem)(keyword2, (kwd) => addRule.call(this, kwd));
          return this;
        }
        keywordMetaschema.call(this, def2);
        const definition = {
          ...def2,
          type: (0, dataType_12.getJSONTypes)(def2.type),
          schemaType: (0, dataType_12.getJSONTypes)(def2.schemaType)
        };
        (0, util_12.eachItem)(keyword2, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t2) => addRule.call(this, k, definition, t2)));
        return this;
      }
      getKeyword(keyword2) {
        const rule = this.RULES.all[keyword2];
        return typeof rule == "object" ? rule.definition : !!rule;
      }
      // Remove keyword
      removeKeyword(keyword2) {
        const { RULES } = this;
        delete RULES.keywords[keyword2];
        delete RULES.all[keyword2];
        for (const group of RULES.rules) {
          const i = group.rules.findIndex((rule) => rule.keyword === keyword2);
          if (i >= 0)
            group.rules.splice(i, 1);
        }
        return this;
      }
      // Add format
      addFormat(name, format2) {
        if (typeof format2 == "string")
          format2 = new RegExp(format2);
        this.formats[name] = format2;
        return this;
      }
      errorsText(errors2 = this.errors, { separator = ", ", dataVar = "data" } = {}) {
        if (!errors2 || errors2.length === 0)
          return "No errors";
        return errors2.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
      }
      $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules2 = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
          const segments = jsonPointer.split("/").slice(1);
          let keywords = metaSchema;
          for (const seg of segments)
            keywords = keywords[seg];
          for (const key in rules2) {
            const rule = rules2[key];
            if (typeof rule != "object")
              continue;
            const { $data } = rule.definition;
            const schema = keywords[key];
            if ($data && schema)
              keywords[key] = schemaOrData(schema);
          }
        }
        return metaSchema;
      }
      _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
          const sch = schemas[keyRef];
          if (!regex || regex.test(keyRef)) {
            if (typeof sch == "string") {
              delete schemas[keyRef];
            } else if (sch && !sch.meta) {
              this._cache.delete(sch.schema);
              delete schemas[keyRef];
            }
          }
        }
      }
      _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id2;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
          id2 = schema[schemaId];
        } else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          else if (typeof schema != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== void 0)
          return sch;
        baseId = (0, resolve_12.normalizeId)(id2 || baseId);
        const localRefs = resolve_12.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_12.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
          if (baseId)
            this._checkUnique(baseId);
          this.refs[baseId] = sch;
        }
        if (validateSchema)
          this.validateSchema(schema, true);
        return sch;
      }
      _checkUnique(id2) {
        if (this.schemas[id2] || this.refs[id2]) {
          throw new Error(`schema with key or id "${id2}" already exists`);
        }
      }
      _compileSchemaEnv(sch) {
        if (sch.meta)
          this._compileMetaSchema(sch);
        else
          compile_12.compileSchema.call(this, sch);
        if (!sch.validate)
          throw new Error("ajv implementation error");
        return sch.validate;
      }
      _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
          compile_12.compileSchema.call(this, sch);
        } finally {
          this.opts = currentOpts;
        }
      }
    }
    exports.default = Ajv;
    Ajv.ValidationError = validation_error_12.default;
    Ajv.MissingRefError = ref_error_12.default;
    function checkOptions(checkOpts, options, msg, log = "error") {
      for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
          this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
      }
    }
    function getSchEnv(keyRef) {
      keyRef = (0, resolve_12.normalizeId)(keyRef);
      return this.schemas[keyRef] || this.refs[keyRef];
    }
    function addInitialSchemas() {
      const optsSchemas = this.opts.schemas;
      if (!optsSchemas)
        return;
      if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
      else
        for (const key in optsSchemas)
          this.addSchema(optsSchemas[key], key);
    }
    function addInitialFormats() {
      for (const name in this.opts.formats) {
        const format2 = this.opts.formats[name];
        if (format2)
          this.addFormat(name, format2);
      }
    }
    function addInitialKeywords(defs) {
      if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const keyword2 in defs) {
        const def2 = defs[keyword2];
        if (!def2.keyword)
          def2.keyword = keyword2;
        this.addKeyword(def2);
      }
    }
    function getMetaSchemaOptions() {
      const metaOpts = { ...this.opts };
      for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
      return metaOpts;
    }
    const noLogs = { log() {
    }, warn() {
    }, error() {
    } };
    function getLogger(logger) {
      if (logger === false)
        return noLogs;
      if (logger === void 0)
        return console;
      if (logger.log && logger.warn && logger.error)
        return logger;
      throw new Error("logger must implement log, warn and error methods");
    }
    const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword2, def2) {
      const { RULES } = this;
      (0, util_12.eachItem)(keyword2, (kwd) => {
        if (RULES.keywords[kwd])
          throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
          throw new Error(`Keyword ${kwd} has invalid name`);
      });
      if (!def2)
        return;
      if (def2.$data && !("code" in def2 || "validate" in def2)) {
        throw new Error('$data keyword must have "code" or "validate" function');
      }
    }
    function addRule(keyword2, definition, dataType2) {
      var _a;
      const post = definition === null || definition === void 0 ? void 0 : definition.post;
      if (dataType2 && post)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES } = this;
      let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t2 }) => t2 === dataType2);
      if (!ruleGroup) {
        ruleGroup = { type: dataType2, rules: [] };
        RULES.rules.push(ruleGroup);
      }
      RULES.keywords[keyword2] = true;
      if (!definition)
        return;
      const rule = {
        keyword: keyword2,
        definition: {
          ...definition,
          type: (0, dataType_12.getJSONTypes)(definition.type),
          schemaType: (0, dataType_12.getJSONTypes)(definition.schemaType)
        }
      };
      if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
      else
        ruleGroup.rules.push(rule);
      RULES.all[keyword2] = rule;
      (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
    }
    function addBeforeRule(ruleGroup, rule, before) {
      const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
      if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
      } else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
      }
    }
    function keywordMetaschema(def2) {
      let { metaSchema } = def2;
      if (metaSchema === void 0)
        return;
      if (def2.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
      def2.validateSchema = this.compile(metaSchema, true);
    }
    const $dataRef = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function schemaOrData(schema) {
      return { anyOf: [schema, $dataRef] };
    }
  })(core$2);
  var draft7 = {};
  var core$1 = {};
  var id = {};
  Object.defineProperty(id, "__esModule", { value: true });
  const def$s = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  id.default = def$s;
  var ref = {};
  Object.defineProperty(ref, "__esModule", { value: true });
  ref.callRef = ref.getValidate = void 0;
  const ref_error_1 = ref_error;
  const code_1$8 = code;
  const codegen_1$l = codegen;
  const names_1$1 = names$1;
  const compile_1$1 = compile;
  const util_1$j = util;
  const def$r = {
    keyword: "$ref",
    schemaType: "string",
    code(cxt) {
      const { gen, schema: $ref, it } = cxt;
      const { baseId, schemaEnv: env, validateName, opts, self: self2 } = it;
      const { root } = env;
      if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
        return callRootRef();
      const schOrEnv = compile_1$1.resolveRef.call(self2, root, baseId, $ref);
      if (schOrEnv === void 0)
        throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
      if (schOrEnv instanceof compile_1$1.SchemaEnv)
        return callValidate(schOrEnv);
      return inlineRefSchema(schOrEnv);
      function callRootRef() {
        if (env === root)
          return callRef(cxt, validateName, env, env.$async);
        const rootName = gen.scopeValue("root", { ref: root });
        return callRef(cxt, (0, codegen_1$l._)`${rootName}.validate`, root, root.$async);
      }
      function callValidate(sch) {
        const v = getValidate(cxt, sch);
        callRef(cxt, v, sch, sch.$async);
      }
      function inlineRefSchema(sch) {
        const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1$l.stringify)(sch) } : { ref: sch });
        const valid = gen.name("valid");
        const schCxt = cxt.subschema({
          schema: sch,
          dataTypes: [],
          schemaPath: codegen_1$l.nil,
          topSchemaRef: schName,
          errSchemaPath: $ref
        }, valid);
        cxt.mergeEvaluated(schCxt);
        cxt.ok(valid);
      }
    }
  };
  function getValidate(cxt, sch) {
    const { gen } = cxt;
    return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1$l._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
  }
  ref.getValidate = getValidate;
  function callRef(cxt, v, sch, $async) {
    const { gen, it } = cxt;
    const { allErrors, schemaEnv: env, opts } = it;
    const passCxt = opts.passContext ? names_1$1.default.this : codegen_1$l.nil;
    if ($async)
      callAsyncRef();
    else
      callSyncRef();
    function callAsyncRef() {
      if (!env.$async)
        throw new Error("async schema referenced by sync schema");
      const valid = gen.let("valid");
      gen.try(() => {
        gen.code((0, codegen_1$l._)`await ${(0, code_1$8.callValidateCode)(cxt, v, passCxt)}`);
        addEvaluatedFrom(v);
        if (!allErrors)
          gen.assign(valid, true);
      }, (e) => {
        gen.if((0, codegen_1$l._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
        addErrorsFrom(e);
        if (!allErrors)
          gen.assign(valid, false);
      });
      cxt.ok(valid);
    }
    function callSyncRef() {
      cxt.result((0, code_1$8.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
    }
    function addErrorsFrom(source) {
      const errs = (0, codegen_1$l._)`${source}.errors`;
      gen.assign(names_1$1.default.vErrors, (0, codegen_1$l._)`${names_1$1.default.vErrors} === null ? ${errs} : ${names_1$1.default.vErrors}.concat(${errs})`);
      gen.assign(names_1$1.default.errors, (0, codegen_1$l._)`${names_1$1.default.vErrors}.length`);
    }
    function addEvaluatedFrom(source) {
      var _a;
      if (!it.opts.unevaluated)
        return;
      const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
      if (it.props !== true) {
        if (schEvaluated && !schEvaluated.dynamicProps) {
          if (schEvaluated.props !== void 0) {
            it.props = util_1$j.mergeEvaluated.props(gen, schEvaluated.props, it.props);
          }
        } else {
          const props = gen.var("props", (0, codegen_1$l._)`${source}.evaluated.props`);
          it.props = util_1$j.mergeEvaluated.props(gen, props, it.props, codegen_1$l.Name);
        }
      }
      if (it.items !== true) {
        if (schEvaluated && !schEvaluated.dynamicItems) {
          if (schEvaluated.items !== void 0) {
            it.items = util_1$j.mergeEvaluated.items(gen, schEvaluated.items, it.items);
          }
        } else {
          const items2 = gen.var("items", (0, codegen_1$l._)`${source}.evaluated.items`);
          it.items = util_1$j.mergeEvaluated.items(gen, items2, it.items, codegen_1$l.Name);
        }
      }
    }
  }
  ref.callRef = callRef;
  ref.default = def$r;
  Object.defineProperty(core$1, "__esModule", { value: true });
  const id_1 = id;
  const ref_1 = ref;
  const core = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    id_1.default,
    ref_1.default
  ];
  core$1.default = core;
  var validation$1 = {};
  var limitNumber = {};
  Object.defineProperty(limitNumber, "__esModule", { value: true });
  const codegen_1$k = codegen;
  const ops = codegen_1$k.operators;
  const KWDs = {
    maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
    minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
    exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
    exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
  };
  const error$i = {
    message: ({ keyword: keyword2, schemaCode }) => (0, codegen_1$k.str)`must be ${KWDs[keyword2].okStr} ${schemaCode}`,
    params: ({ keyword: keyword2, schemaCode }) => (0, codegen_1$k._)`{comparison: ${KWDs[keyword2].okStr}, limit: ${schemaCode}}`
  };
  const def$q = {
    keyword: Object.keys(KWDs),
    type: "number",
    schemaType: "number",
    $data: true,
    error: error$i,
    code(cxt) {
      const { keyword: keyword2, data, schemaCode } = cxt;
      cxt.fail$data((0, codegen_1$k._)`${data} ${KWDs[keyword2].fail} ${schemaCode} || isNaN(${data})`);
    }
  };
  limitNumber.default = def$q;
  var multipleOf = {};
  Object.defineProperty(multipleOf, "__esModule", { value: true });
  const codegen_1$j = codegen;
  const error$h = {
    message: ({ schemaCode }) => (0, codegen_1$j.str)`must be multiple of ${schemaCode}`,
    params: ({ schemaCode }) => (0, codegen_1$j._)`{multipleOf: ${schemaCode}}`
  };
  const def$p = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: true,
    error: error$h,
    code(cxt) {
      const { gen, data, schemaCode, it } = cxt;
      const prec = it.opts.multipleOfPrecision;
      const res = gen.let("res");
      const invalid = prec ? (0, codegen_1$j._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1$j._)`${res} !== parseInt(${res})`;
      cxt.fail$data((0, codegen_1$j._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
    }
  };
  multipleOf.default = def$p;
  var limitLength = {};
  var ucs2length$1 = {};
  Object.defineProperty(ucs2length$1, "__esModule", { value: true });
  function ucs2length(str) {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value;
    while (pos < len) {
      length++;
      value = str.charCodeAt(pos++);
      if (value >= 55296 && value <= 56319 && pos < len) {
        value = str.charCodeAt(pos);
        if ((value & 64512) === 56320)
          pos++;
      }
    }
    return length;
  }
  ucs2length$1.default = ucs2length;
  ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  Object.defineProperty(limitLength, "__esModule", { value: true });
  const codegen_1$i = codegen;
  const util_1$i = util;
  const ucs2length_1 = ucs2length$1;
  const error$g = {
    message({ keyword: keyword2, schemaCode }) {
      const comp = keyword2 === "maxLength" ? "more" : "fewer";
      return (0, codegen_1$i.str)`must NOT have ${comp} than ${schemaCode} characters`;
    },
    params: ({ schemaCode }) => (0, codegen_1$i._)`{limit: ${schemaCode}}`
  };
  const def$o = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: true,
    error: error$g,
    code(cxt) {
      const { keyword: keyword2, data, schemaCode, it } = cxt;
      const op = keyword2 === "maxLength" ? codegen_1$i.operators.GT : codegen_1$i.operators.LT;
      const len = it.opts.unicode === false ? (0, codegen_1$i._)`${data}.length` : (0, codegen_1$i._)`${(0, util_1$i.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
      cxt.fail$data((0, codegen_1$i._)`${len} ${op} ${schemaCode}`);
    }
  };
  limitLength.default = def$o;
  var pattern = {};
  Object.defineProperty(pattern, "__esModule", { value: true });
  const code_1$7 = code;
  const codegen_1$h = codegen;
  const error$f = {
    message: ({ schemaCode }) => (0, codegen_1$h.str)`must match pattern "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1$h._)`{pattern: ${schemaCode}}`
  };
  const def$n = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: true,
    error: error$f,
    code(cxt) {
      const { data, $data, schema, schemaCode, it } = cxt;
      const u = it.opts.unicodeRegExp ? "u" : "";
      const regExp = $data ? (0, codegen_1$h._)`(new RegExp(${schemaCode}, ${u}))` : (0, code_1$7.usePattern)(cxt, schema);
      cxt.fail$data((0, codegen_1$h._)`!${regExp}.test(${data})`);
    }
  };
  pattern.default = def$n;
  var limitProperties = {};
  Object.defineProperty(limitProperties, "__esModule", { value: true });
  const codegen_1$g = codegen;
  const error$e = {
    message({ keyword: keyword2, schemaCode }) {
      const comp = keyword2 === "maxProperties" ? "more" : "fewer";
      return (0, codegen_1$g.str)`must NOT have ${comp} than ${schemaCode} properties`;
    },
    params: ({ schemaCode }) => (0, codegen_1$g._)`{limit: ${schemaCode}}`
  };
  const def$m = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: true,
    error: error$e,
    code(cxt) {
      const { keyword: keyword2, data, schemaCode } = cxt;
      const op = keyword2 === "maxProperties" ? codegen_1$g.operators.GT : codegen_1$g.operators.LT;
      cxt.fail$data((0, codegen_1$g._)`Object.keys(${data}).length ${op} ${schemaCode}`);
    }
  };
  limitProperties.default = def$m;
  var required = {};
  Object.defineProperty(required, "__esModule", { value: true });
  const code_1$6 = code;
  const codegen_1$f = codegen;
  const util_1$h = util;
  const error$d = {
    message: ({ params: { missingProperty } }) => (0, codegen_1$f.str)`must have required property '${missingProperty}'`,
    params: ({ params: { missingProperty } }) => (0, codegen_1$f._)`{missingProperty: ${missingProperty}}`
  };
  const def$l = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: true,
    error: error$d,
    code(cxt) {
      const { gen, schema, schemaCode, data, $data, it } = cxt;
      const { opts } = it;
      if (!$data && schema.length === 0)
        return;
      const useLoop = schema.length >= opts.loopRequired;
      if (it.allErrors)
        allErrorsMode();
      else
        exitOnErrorMode();
      if (opts.strictRequired) {
        const props = cxt.parentSchema.properties;
        const { definedProperties } = cxt.it;
        for (const requiredKey of schema) {
          if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
            const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
            const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
            (0, util_1$h.checkStrictMode)(it, msg, it.opts.strictRequired);
          }
        }
      }
      function allErrorsMode() {
        if (useLoop || $data) {
          cxt.block$data(codegen_1$f.nil, loopAllRequired);
        } else {
          for (const prop of schema) {
            (0, code_1$6.checkReportMissingProp)(cxt, prop);
          }
        }
      }
      function exitOnErrorMode() {
        const missing = gen.let("missing");
        if (useLoop || $data) {
          const valid = gen.let("valid", true);
          cxt.block$data(valid, () => loopUntilMissing(missing, valid));
          cxt.ok(valid);
        } else {
          gen.if((0, code_1$6.checkMissingProp)(cxt, schema, missing));
          (0, code_1$6.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
      function loopAllRequired() {
        gen.forOf("prop", schemaCode, (prop) => {
          cxt.setParams({ missingProperty: prop });
          gen.if((0, code_1$6.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
        });
      }
      function loopUntilMissing(missing, valid) {
        cxt.setParams({ missingProperty: missing });
        gen.forOf(missing, schemaCode, () => {
          gen.assign(valid, (0, code_1$6.propertyInData)(gen, data, missing, opts.ownProperties));
          gen.if((0, codegen_1$f.not)(valid), () => {
            cxt.error();
            gen.break();
          });
        }, codegen_1$f.nil);
      }
    }
  };
  required.default = def$l;
  var limitItems = {};
  Object.defineProperty(limitItems, "__esModule", { value: true });
  const codegen_1$e = codegen;
  const error$c = {
    message({ keyword: keyword2, schemaCode }) {
      const comp = keyword2 === "maxItems" ? "more" : "fewer";
      return (0, codegen_1$e.str)`must NOT have ${comp} than ${schemaCode} items`;
    },
    params: ({ schemaCode }) => (0, codegen_1$e._)`{limit: ${schemaCode}}`
  };
  const def$k = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: true,
    error: error$c,
    code(cxt) {
      const { keyword: keyword2, data, schemaCode } = cxt;
      const op = keyword2 === "maxItems" ? codegen_1$e.operators.GT : codegen_1$e.operators.LT;
      cxt.fail$data((0, codegen_1$e._)`${data}.length ${op} ${schemaCode}`);
    }
  };
  limitItems.default = def$k;
  var uniqueItems = {};
  var equal$1 = {};
  Object.defineProperty(equal$1, "__esModule", { value: true });
  const equal = fastDeepEqual;
  equal.code = 'require("ajv/dist/runtime/equal").default';
  equal$1.default = equal;
  Object.defineProperty(uniqueItems, "__esModule", { value: true });
  const dataType_1 = dataType;
  const codegen_1$d = codegen;
  const util_1$g = util;
  const equal_1$2 = equal$1;
  const error$b = {
    message: ({ params: { i, j } }) => (0, codegen_1$d.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
    params: ({ params: { i, j } }) => (0, codegen_1$d._)`{i: ${i}, j: ${j}}`
  };
  const def$j = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: true,
    error: error$b,
    code(cxt) {
      const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
      if (!$data && !schema)
        return;
      const valid = gen.let("valid");
      const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
      cxt.block$data(valid, validateUniqueItems, (0, codegen_1$d._)`${schemaCode} === false`);
      cxt.ok(valid);
      function validateUniqueItems() {
        const i = gen.let("i", (0, codegen_1$d._)`${data}.length`);
        const j = gen.let("j");
        cxt.setParams({ i, j });
        gen.assign(valid, true);
        gen.if((0, codegen_1$d._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
      }
      function canOptimize() {
        return itemTypes.length > 0 && !itemTypes.some((t2) => t2 === "object" || t2 === "array");
      }
      function loopN(i, j) {
        const item = gen.name("item");
        const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
        const indices = gen.const("indices", (0, codegen_1$d._)`{}`);
        gen.for((0, codegen_1$d._)`;${i}--;`, () => {
          gen.let(item, (0, codegen_1$d._)`${data}[${i}]`);
          gen.if(wrongType, (0, codegen_1$d._)`continue`);
          if (itemTypes.length > 1)
            gen.if((0, codegen_1$d._)`typeof ${item} == "string"`, (0, codegen_1$d._)`${item} += "_"`);
          gen.if((0, codegen_1$d._)`typeof ${indices}[${item}] == "number"`, () => {
            gen.assign(j, (0, codegen_1$d._)`${indices}[${item}]`);
            cxt.error();
            gen.assign(valid, false).break();
          }).code((0, codegen_1$d._)`${indices}[${item}] = ${i}`);
        });
      }
      function loopN2(i, j) {
        const eql = (0, util_1$g.useFunc)(gen, equal_1$2.default);
        const outer = gen.name("outer");
        gen.label(outer).for((0, codegen_1$d._)`;${i}--;`, () => gen.for((0, codegen_1$d._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1$d._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
          cxt.error();
          gen.assign(valid, false).break(outer);
        })));
      }
    }
  };
  uniqueItems.default = def$j;
  var _const = {};
  Object.defineProperty(_const, "__esModule", { value: true });
  const codegen_1$c = codegen;
  const util_1$f = util;
  const equal_1$1 = equal$1;
  const error$a = {
    message: "must be equal to constant",
    params: ({ schemaCode }) => (0, codegen_1$c._)`{allowedValue: ${schemaCode}}`
  };
  const def$i = {
    keyword: "const",
    $data: true,
    error: error$a,
    code(cxt) {
      const { gen, data, $data, schemaCode, schema } = cxt;
      if ($data || schema && typeof schema == "object") {
        cxt.fail$data((0, codegen_1$c._)`!${(0, util_1$f.useFunc)(gen, equal_1$1.default)}(${data}, ${schemaCode})`);
      } else {
        cxt.fail((0, codegen_1$c._)`${schema} !== ${data}`);
      }
    }
  };
  _const.default = def$i;
  var _enum = {};
  Object.defineProperty(_enum, "__esModule", { value: true });
  const codegen_1$b = codegen;
  const util_1$e = util;
  const equal_1 = equal$1;
  const error$9 = {
    message: "must be equal to one of the allowed values",
    params: ({ schemaCode }) => (0, codegen_1$b._)`{allowedValues: ${schemaCode}}`
  };
  const def$h = {
    keyword: "enum",
    schemaType: "array",
    $data: true,
    error: error$9,
    code(cxt) {
      const { gen, data, $data, schema, schemaCode, it } = cxt;
      if (!$data && schema.length === 0)
        throw new Error("enum must have non-empty array");
      const useLoop = schema.length >= it.opts.loopEnum;
      let eql;
      const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1$e.useFunc)(gen, equal_1.default);
      let valid;
      if (useLoop || $data) {
        valid = gen.let("valid");
        cxt.block$data(valid, loopEnum);
      } else {
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        const vSchema = gen.const("vSchema", schemaCode);
        valid = (0, codegen_1$b.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
      }
      cxt.pass(valid);
      function loopEnum() {
        gen.assign(valid, false);
        gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1$b._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
      }
      function equalCode(vSchema, i) {
        const sch = schema[i];
        return typeof sch === "object" && sch !== null ? (0, codegen_1$b._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1$b._)`${data} === ${sch}`;
      }
    }
  };
  _enum.default = def$h;
  Object.defineProperty(validation$1, "__esModule", { value: true });
  const limitNumber_1 = limitNumber;
  const multipleOf_1 = multipleOf;
  const limitLength_1 = limitLength;
  const pattern_1 = pattern;
  const limitProperties_1 = limitProperties;
  const required_1 = required;
  const limitItems_1 = limitItems;
  const uniqueItems_1 = uniqueItems;
  const const_1 = _const;
  const enum_1 = _enum;
  const validation = [
    // number
    limitNumber_1.default,
    multipleOf_1.default,
    // string
    limitLength_1.default,
    pattern_1.default,
    // object
    limitProperties_1.default,
    required_1.default,
    // array
    limitItems_1.default,
    uniqueItems_1.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    const_1.default,
    enum_1.default
  ];
  validation$1.default = validation;
  var applicator = {};
  var additionalItems = {};
  Object.defineProperty(additionalItems, "__esModule", { value: true });
  additionalItems.validateAdditionalItems = void 0;
  const codegen_1$a = codegen;
  const util_1$d = util;
  const error$8 = {
    message: ({ params: { len } }) => (0, codegen_1$a.str)`must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1$a._)`{limit: ${len}}`
  };
  const def$g = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: error$8,
    code(cxt) {
      const { parentSchema, it } = cxt;
      const { items: items2 } = parentSchema;
      if (!Array.isArray(items2)) {
        (0, util_1$d.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      validateAdditionalItems(cxt, items2);
    }
  };
  function validateAdditionalItems(cxt, items2) {
    const { gen, schema, data, keyword: keyword2, it } = cxt;
    it.items = true;
    const len = gen.const("len", (0, codegen_1$a._)`${data}.length`);
    if (schema === false) {
      cxt.setParams({ len: items2.length });
      cxt.pass((0, codegen_1$a._)`${len} <= ${items2.length}`);
    } else if (typeof schema == "object" && !(0, util_1$d.alwaysValidSchema)(it, schema)) {
      const valid = gen.var("valid", (0, codegen_1$a._)`${len} <= ${items2.length}`);
      gen.if((0, codegen_1$a.not)(valid), () => validateItems(valid));
      cxt.ok(valid);
    }
    function validateItems(valid) {
      gen.forRange("i", items2.length, len, (i) => {
        cxt.subschema({ keyword: keyword2, dataProp: i, dataPropType: util_1$d.Type.Num }, valid);
        if (!it.allErrors)
          gen.if((0, codegen_1$a.not)(valid), () => gen.break());
      });
    }
  }
  additionalItems.validateAdditionalItems = validateAdditionalItems;
  additionalItems.default = def$g;
  var prefixItems = {};
  var items = {};
  Object.defineProperty(items, "__esModule", { value: true });
  items.validateTuple = void 0;
  const codegen_1$9 = codegen;
  const util_1$c = util;
  const code_1$5 = code;
  const def$f = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(cxt) {
      const { schema, it } = cxt;
      if (Array.isArray(schema))
        return validateTuple(cxt, "additionalItems", schema);
      it.items = true;
      if ((0, util_1$c.alwaysValidSchema)(it, schema))
        return;
      cxt.ok((0, code_1$5.validateArray)(cxt));
    }
  };
  function validateTuple(cxt, extraItems, schArr = cxt.schema) {
    const { gen, parentSchema, data, keyword: keyword2, it } = cxt;
    checkStrictTuple(parentSchema);
    if (it.opts.unevaluated && schArr.length && it.items !== true) {
      it.items = util_1$c.mergeEvaluated.items(gen, schArr.length, it.items);
    }
    const valid = gen.name("valid");
    const len = gen.const("len", (0, codegen_1$9._)`${data}.length`);
    schArr.forEach((sch, i) => {
      if ((0, util_1$c.alwaysValidSchema)(it, sch))
        return;
      gen.if((0, codegen_1$9._)`${len} > ${i}`, () => cxt.subschema({
        keyword: keyword2,
        schemaProp: i,
        dataProp: i
      }, valid));
      cxt.ok(valid);
    });
    function checkStrictTuple(sch) {
      const { opts, errSchemaPath } = it;
      const l = schArr.length;
      const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
      if (opts.strictTuples && !fullTuple) {
        const msg = `"${keyword2}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
        (0, util_1$c.checkStrictMode)(it, msg, opts.strictTuples);
      }
    }
  }
  items.validateTuple = validateTuple;
  items.default = def$f;
  Object.defineProperty(prefixItems, "__esModule", { value: true });
  const items_1$1 = items;
  const def$e = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (cxt) => (0, items_1$1.validateTuple)(cxt, "items")
  };
  prefixItems.default = def$e;
  var items2020 = {};
  Object.defineProperty(items2020, "__esModule", { value: true });
  const codegen_1$8 = codegen;
  const util_1$b = util;
  const code_1$4 = code;
  const additionalItems_1$1 = additionalItems;
  const error$7 = {
    message: ({ params: { len } }) => (0, codegen_1$8.str)`must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1$8._)`{limit: ${len}}`
  };
  const def$d = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: error$7,
    code(cxt) {
      const { schema, parentSchema, it } = cxt;
      const { prefixItems: prefixItems2 } = parentSchema;
      it.items = true;
      if ((0, util_1$b.alwaysValidSchema)(it, schema))
        return;
      if (prefixItems2)
        (0, additionalItems_1$1.validateAdditionalItems)(cxt, prefixItems2);
      else
        cxt.ok((0, code_1$4.validateArray)(cxt));
    }
  };
  items2020.default = def$d;
  var contains = {};
  Object.defineProperty(contains, "__esModule", { value: true });
  const codegen_1$7 = codegen;
  const util_1$a = util;
  const error$6 = {
    message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1$7.str)`must contain at least ${min} valid item(s)` : (0, codegen_1$7.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
    params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1$7._)`{minContains: ${min}}` : (0, codegen_1$7._)`{minContains: ${min}, maxContains: ${max}}`
  };
  const def$c = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: true,
    error: error$6,
    code(cxt) {
      const { gen, schema, parentSchema, data, it } = cxt;
      let min;
      let max;
      const { minContains, maxContains } = parentSchema;
      if (it.opts.next) {
        min = minContains === void 0 ? 1 : minContains;
        max = maxContains;
      } else {
        min = 1;
      }
      const len = gen.const("len", (0, codegen_1$7._)`${data}.length`);
      cxt.setParams({ min, max });
      if (max === void 0 && min === 0) {
        (0, util_1$a.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
        return;
      }
      if (max !== void 0 && min > max) {
        (0, util_1$a.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
        cxt.fail();
        return;
      }
      if ((0, util_1$a.alwaysValidSchema)(it, schema)) {
        let cond = (0, codegen_1$7._)`${len} >= ${min}`;
        if (max !== void 0)
          cond = (0, codegen_1$7._)`${cond} && ${len} <= ${max}`;
        cxt.pass(cond);
        return;
      }
      it.items = true;
      const valid = gen.name("valid");
      if (max === void 0 && min === 1) {
        validateItems(valid, () => gen.if(valid, () => gen.break()));
      } else if (min === 0) {
        gen.let(valid, true);
        if (max !== void 0)
          gen.if((0, codegen_1$7._)`${data}.length > 0`, validateItemsWithCount);
      } else {
        gen.let(valid, false);
        validateItemsWithCount();
      }
      cxt.result(valid, () => cxt.reset());
      function validateItemsWithCount() {
        const schValid = gen.name("_valid");
        const count = gen.let("count", 0);
        validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
      }
      function validateItems(_valid, block) {
        gen.forRange("i", 0, len, (i) => {
          cxt.subschema({
            keyword: "contains",
            dataProp: i,
            dataPropType: util_1$a.Type.Num,
            compositeRule: true
          }, _valid);
          block();
        });
      }
      function checkLimits(count) {
        gen.code((0, codegen_1$7._)`${count}++`);
        if (max === void 0) {
          gen.if((0, codegen_1$7._)`${count} >= ${min}`, () => gen.assign(valid, true).break());
        } else {
          gen.if((0, codegen_1$7._)`${count} > ${max}`, () => gen.assign(valid, false).break());
          if (min === 1)
            gen.assign(valid, true);
          else
            gen.if((0, codegen_1$7._)`${count} >= ${min}`, () => gen.assign(valid, true));
        }
      }
    }
  };
  contains.default = def$c;
  var dependencies = {};
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
    const codegen_12 = codegen;
    const util_12 = util;
    const code_12 = code;
    exports.error = {
      message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_12.str)`must have ${property_ies} ${deps} when property ${property} is present`;
      },
      params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_12._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
      // TODO change to reference
    };
    const def2 = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: exports.error,
      code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
      }
    };
    function splitDependencies({ schema }) {
      const propertyDeps = {};
      const schemaDeps = {};
      for (const key in schema) {
        if (key === "__proto__")
          continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
      }
      return [propertyDeps, schemaDeps];
    }
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
      const { gen, data, it } = cxt;
      if (Object.keys(propertyDeps).length === 0)
        return;
      const missing = gen.let("missing");
      for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
          continue;
        const hasProperty = (0, code_12.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
          property: prop,
          depsCount: deps.length,
          deps: deps.join(", ")
        });
        if (it.allErrors) {
          gen.if(hasProperty, () => {
            for (const depProp of deps) {
              (0, code_12.checkReportMissingProp)(cxt, depProp);
            }
          });
        } else {
          gen.if((0, codegen_12._)`${hasProperty} && (${(0, code_12.checkMissingProp)(cxt, deps, missing)})`);
          (0, code_12.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
    }
    exports.validatePropertyDeps = validatePropertyDeps;
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
      const { gen, data, keyword: keyword2, it } = cxt;
      const valid = gen.name("valid");
      for (const prop in schemaDeps) {
        if ((0, util_12.alwaysValidSchema)(it, schemaDeps[prop]))
          continue;
        gen.if(
          (0, code_12.propertyInData)(gen, data, prop, it.opts.ownProperties),
          () => {
            const schCxt = cxt.subschema({ keyword: keyword2, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
          },
          () => gen.var(valid, true)
          // TODO var
        );
        cxt.ok(valid);
      }
    }
    exports.validateSchemaDeps = validateSchemaDeps;
    exports.default = def2;
  })(dependencies);
  var propertyNames = {};
  Object.defineProperty(propertyNames, "__esModule", { value: true });
  const codegen_1$6 = codegen;
  const util_1$9 = util;
  const error$5 = {
    message: "property name must be valid",
    params: ({ params }) => (0, codegen_1$6._)`{propertyName: ${params.propertyName}}`
  };
  const def$b = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: error$5,
    code(cxt) {
      const { gen, schema, data, it } = cxt;
      if ((0, util_1$9.alwaysValidSchema)(it, schema))
        return;
      const valid = gen.name("valid");
      gen.forIn("key", data, (key) => {
        cxt.setParams({ propertyName: key });
        cxt.subschema({
          keyword: "propertyNames",
          data: key,
          dataTypes: ["string"],
          propertyName: key,
          compositeRule: true
        }, valid);
        gen.if((0, codegen_1$6.not)(valid), () => {
          cxt.error(true);
          if (!it.allErrors)
            gen.break();
        });
      });
      cxt.ok(valid);
    }
  };
  propertyNames.default = def$b;
  var additionalProperties = {};
  Object.defineProperty(additionalProperties, "__esModule", { value: true });
  const code_1$3 = code;
  const codegen_1$5 = codegen;
  const names_1 = names$1;
  const util_1$8 = util;
  const error$4 = {
    message: "must NOT have additional properties",
    params: ({ params }) => (0, codegen_1$5._)`{additionalProperty: ${params.additionalProperty}}`
  };
  const def$a = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: true,
    trackErrors: true,
    error: error$4,
    code(cxt) {
      const { gen, schema, parentSchema, data, errsCount, it } = cxt;
      if (!errsCount)
        throw new Error("ajv implementation error");
      const { allErrors, opts } = it;
      it.props = true;
      if (opts.removeAdditional !== "all" && (0, util_1$8.alwaysValidSchema)(it, schema))
        return;
      const props = (0, code_1$3.allSchemaProperties)(parentSchema.properties);
      const patProps = (0, code_1$3.allSchemaProperties)(parentSchema.patternProperties);
      checkAdditionalProperties();
      cxt.ok((0, codegen_1$5._)`${errsCount} === ${names_1.default.errors}`);
      function checkAdditionalProperties() {
        gen.forIn("key", data, (key) => {
          if (!props.length && !patProps.length)
            additionalPropertyCode(key);
          else
            gen.if(isAdditional(key), () => additionalPropertyCode(key));
        });
      }
      function isAdditional(key) {
        let definedProp;
        if (props.length > 8) {
          const propsSchema = (0, util_1$8.schemaRefOrVal)(it, parentSchema.properties, "properties");
          definedProp = (0, code_1$3.isOwnProperty)(gen, propsSchema, key);
        } else if (props.length) {
          definedProp = (0, codegen_1$5.or)(...props.map((p) => (0, codegen_1$5._)`${key} === ${p}`));
        } else {
          definedProp = codegen_1$5.nil;
        }
        if (patProps.length) {
          definedProp = (0, codegen_1$5.or)(definedProp, ...patProps.map((p) => (0, codegen_1$5._)`${(0, code_1$3.usePattern)(cxt, p)}.test(${key})`));
        }
        return (0, codegen_1$5.not)(definedProp);
      }
      function deleteAdditional(key) {
        gen.code((0, codegen_1$5._)`delete ${data}[${key}]`);
      }
      function additionalPropertyCode(key) {
        if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
          deleteAdditional(key);
          return;
        }
        if (schema === false) {
          cxt.setParams({ additionalProperty: key });
          cxt.error();
          if (!allErrors)
            gen.break();
          return;
        }
        if (typeof schema == "object" && !(0, util_1$8.alwaysValidSchema)(it, schema)) {
          const valid = gen.name("valid");
          if (opts.removeAdditional === "failing") {
            applyAdditionalSchema(key, valid, false);
            gen.if((0, codegen_1$5.not)(valid), () => {
              cxt.reset();
              deleteAdditional(key);
            });
          } else {
            applyAdditionalSchema(key, valid);
            if (!allErrors)
              gen.if((0, codegen_1$5.not)(valid), () => gen.break());
          }
        }
      }
      function applyAdditionalSchema(key, valid, errors2) {
        const subschema2 = {
          keyword: "additionalProperties",
          dataProp: key,
          dataPropType: util_1$8.Type.Str
        };
        if (errors2 === false) {
          Object.assign(subschema2, {
            compositeRule: true,
            createErrors: false,
            allErrors: false
          });
        }
        cxt.subschema(subschema2, valid);
      }
    }
  };
  additionalProperties.default = def$a;
  var properties$1 = {};
  Object.defineProperty(properties$1, "__esModule", { value: true });
  const validate_1 = validate;
  const code_1$2 = code;
  const util_1$7 = util;
  const additionalProperties_1$1 = additionalProperties;
  const def$9 = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(cxt) {
      const { gen, schema, parentSchema, data, it } = cxt;
      if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
        additionalProperties_1$1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1$1.default, "additionalProperties"));
      }
      const allProps = (0, code_1$2.allSchemaProperties)(schema);
      for (const prop of allProps) {
        it.definedProperties.add(prop);
      }
      if (it.opts.unevaluated && allProps.length && it.props !== true) {
        it.props = util_1$7.mergeEvaluated.props(gen, (0, util_1$7.toHash)(allProps), it.props);
      }
      const properties2 = allProps.filter((p) => !(0, util_1$7.alwaysValidSchema)(it, schema[p]));
      if (properties2.length === 0)
        return;
      const valid = gen.name("valid");
      for (const prop of properties2) {
        if (hasDefault(prop)) {
          applyPropertySchema(prop);
        } else {
          gen.if((0, code_1$2.propertyInData)(gen, data, prop, it.opts.ownProperties));
          applyPropertySchema(prop);
          if (!it.allErrors)
            gen.else().var(valid, true);
          gen.endIf();
        }
        cxt.it.definedProperties.add(prop);
        cxt.ok(valid);
      }
      function hasDefault(prop) {
        return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
      }
      function applyPropertySchema(prop) {
        cxt.subschema({
          keyword: "properties",
          schemaProp: prop,
          dataProp: prop
        }, valid);
      }
    }
  };
  properties$1.default = def$9;
  var patternProperties = {};
  Object.defineProperty(patternProperties, "__esModule", { value: true });
  const code_1$1 = code;
  const codegen_1$4 = codegen;
  const util_1$6 = util;
  const util_2 = util;
  const def$8 = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(cxt) {
      const { gen, schema, data, parentSchema, it } = cxt;
      const { opts } = it;
      const patterns = (0, code_1$1.allSchemaProperties)(schema);
      const alwaysValidPatterns = patterns.filter((p) => (0, util_1$6.alwaysValidSchema)(it, schema[p]));
      if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
        return;
      }
      const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
      const valid = gen.name("valid");
      if (it.props !== true && !(it.props instanceof codegen_1$4.Name)) {
        it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
      }
      const { props } = it;
      validatePatternProperties();
      function validatePatternProperties() {
        for (const pat of patterns) {
          if (checkProperties)
            checkMatchingProperties(pat);
          if (it.allErrors) {
            validateProperties(pat);
          } else {
            gen.var(valid, true);
            validateProperties(pat);
            gen.if(valid);
          }
        }
      }
      function checkMatchingProperties(pat) {
        for (const prop in checkProperties) {
          if (new RegExp(pat).test(prop)) {
            (0, util_1$6.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
          }
        }
      }
      function validateProperties(pat) {
        gen.forIn("key", data, (key) => {
          gen.if((0, codegen_1$4._)`${(0, code_1$1.usePattern)(cxt, pat)}.test(${key})`, () => {
            const alwaysValid = alwaysValidPatterns.includes(pat);
            if (!alwaysValid) {
              cxt.subschema({
                keyword: "patternProperties",
                schemaProp: pat,
                dataProp: key,
                dataPropType: util_2.Type.Str
              }, valid);
            }
            if (it.opts.unevaluated && props !== true) {
              gen.assign((0, codegen_1$4._)`${props}[${key}]`, true);
            } else if (!alwaysValid && !it.allErrors) {
              gen.if((0, codegen_1$4.not)(valid), () => gen.break());
            }
          });
        });
      }
    }
  };
  patternProperties.default = def$8;
  var not = {};
  Object.defineProperty(not, "__esModule", { value: true });
  const util_1$5 = util;
  const def$7 = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    code(cxt) {
      const { gen, schema, it } = cxt;
      if ((0, util_1$5.alwaysValidSchema)(it, schema)) {
        cxt.fail();
        return;
      }
      const valid = gen.name("valid");
      cxt.subschema({
        keyword: "not",
        compositeRule: true,
        createErrors: false,
        allErrors: false
      }, valid);
      cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
    },
    error: { message: "must NOT be valid" }
  };
  not.default = def$7;
  var anyOf = {};
  Object.defineProperty(anyOf, "__esModule", { value: true });
  const code_1 = code;
  const def$6 = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: true,
    code: code_1.validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  anyOf.default = def$6;
  var oneOf = {};
  Object.defineProperty(oneOf, "__esModule", { value: true });
  const codegen_1$3 = codegen;
  const util_1$4 = util;
  const error$3 = {
    message: "must match exactly one schema in oneOf",
    params: ({ params }) => (0, codegen_1$3._)`{passingSchemas: ${params.passing}}`
  };
  const def$5 = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: true,
    error: error$3,
    code(cxt) {
      const { gen, schema, parentSchema, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      if (it.opts.discriminator && parentSchema.discriminator)
        return;
      const schArr = schema;
      const valid = gen.let("valid", false);
      const passing = gen.let("passing", null);
      const schValid = gen.name("_valid");
      cxt.setParams({ passing });
      gen.block(validateOneOf);
      cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
      function validateOneOf() {
        schArr.forEach((sch, i) => {
          let schCxt;
          if ((0, util_1$4.alwaysValidSchema)(it, sch)) {
            gen.var(schValid, true);
          } else {
            schCxt = cxt.subschema({
              keyword: "oneOf",
              schemaProp: i,
              compositeRule: true
            }, schValid);
          }
          if (i > 0) {
            gen.if((0, codegen_1$3._)`${schValid} && ${valid}`).assign(valid, false).assign(passing, (0, codegen_1$3._)`[${passing}, ${i}]`).else();
          }
          gen.if(schValid, () => {
            gen.assign(valid, true);
            gen.assign(passing, i);
            if (schCxt)
              cxt.mergeEvaluated(schCxt, codegen_1$3.Name);
          });
        });
      }
    }
  };
  oneOf.default = def$5;
  var allOf = {};
  Object.defineProperty(allOf, "__esModule", { value: true });
  const util_1$3 = util;
  const def$4 = {
    keyword: "allOf",
    schemaType: "array",
    code(cxt) {
      const { gen, schema, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      const valid = gen.name("valid");
      schema.forEach((sch, i) => {
        if ((0, util_1$3.alwaysValidSchema)(it, sch))
          return;
        const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
        cxt.ok(valid);
        cxt.mergeEvaluated(schCxt);
      });
    }
  };
  allOf.default = def$4;
  var _if = {};
  Object.defineProperty(_if, "__esModule", { value: true });
  const codegen_1$2 = codegen;
  const util_1$2 = util;
  const error$2 = {
    message: ({ params }) => (0, codegen_1$2.str)`must match "${params.ifClause}" schema`,
    params: ({ params }) => (0, codegen_1$2._)`{failingKeyword: ${params.ifClause}}`
  };
  const def$3 = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    error: error$2,
    code(cxt) {
      const { gen, parentSchema, it } = cxt;
      if (parentSchema.then === void 0 && parentSchema.else === void 0) {
        (0, util_1$2.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
      }
      const hasThen = hasSchema(it, "then");
      const hasElse = hasSchema(it, "else");
      if (!hasThen && !hasElse)
        return;
      const valid = gen.let("valid", true);
      const schValid = gen.name("_valid");
      validateIf();
      cxt.reset();
      if (hasThen && hasElse) {
        const ifClause = gen.let("ifClause");
        cxt.setParams({ ifClause });
        gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
      } else if (hasThen) {
        gen.if(schValid, validateClause("then"));
      } else {
        gen.if((0, codegen_1$2.not)(schValid), validateClause("else"));
      }
      cxt.pass(valid, () => cxt.error(true));
      function validateIf() {
        const schCxt = cxt.subschema({
          keyword: "if",
          compositeRule: true,
          createErrors: false,
          allErrors: false
        }, schValid);
        cxt.mergeEvaluated(schCxt);
      }
      function validateClause(keyword2, ifClause) {
        return () => {
          const schCxt = cxt.subschema({ keyword: keyword2 }, schValid);
          gen.assign(valid, schValid);
          cxt.mergeValidEvaluated(schCxt, valid);
          if (ifClause)
            gen.assign(ifClause, (0, codegen_1$2._)`${keyword2}`);
          else
            cxt.setParams({ ifClause: keyword2 });
        };
      }
    }
  };
  function hasSchema(it, keyword2) {
    const schema = it.schema[keyword2];
    return schema !== void 0 && !(0, util_1$2.alwaysValidSchema)(it, schema);
  }
  _if.default = def$3;
  var thenElse = {};
  Object.defineProperty(thenElse, "__esModule", { value: true });
  const util_1$1 = util;
  const def$2 = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: keyword2, parentSchema, it }) {
      if (parentSchema.if === void 0)
        (0, util_1$1.checkStrictMode)(it, `"${keyword2}" without "if" is ignored`);
    }
  };
  thenElse.default = def$2;
  Object.defineProperty(applicator, "__esModule", { value: true });
  const additionalItems_1 = additionalItems;
  const prefixItems_1 = prefixItems;
  const items_1 = items;
  const items2020_1 = items2020;
  const contains_1 = contains;
  const dependencies_1 = dependencies;
  const propertyNames_1 = propertyNames;
  const additionalProperties_1 = additionalProperties;
  const properties_1 = properties$1;
  const patternProperties_1 = patternProperties;
  const not_1 = not;
  const anyOf_1 = anyOf;
  const oneOf_1 = oneOf;
  const allOf_1 = allOf;
  const if_1 = _if;
  const thenElse_1 = thenElse;
  function getApplicator(draft2020 = false) {
    const applicator2 = [
      // any
      not_1.default,
      anyOf_1.default,
      oneOf_1.default,
      allOf_1.default,
      if_1.default,
      thenElse_1.default,
      // object
      propertyNames_1.default,
      additionalProperties_1.default,
      dependencies_1.default,
      properties_1.default,
      patternProperties_1.default
    ];
    if (draft2020)
      applicator2.push(prefixItems_1.default, items2020_1.default);
    else
      applicator2.push(additionalItems_1.default, items_1.default);
    applicator2.push(contains_1.default);
    return applicator2;
  }
  applicator.default = getApplicator;
  var format$2 = {};
  var format$1 = {};
  Object.defineProperty(format$1, "__esModule", { value: true });
  const codegen_1$1 = codegen;
  const error$1 = {
    message: ({ schemaCode }) => (0, codegen_1$1.str)`must match format "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1$1._)`{format: ${schemaCode}}`
  };
  const def$1 = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: true,
    error: error$1,
    code(cxt, ruleType) {
      const { gen, data, $data, schema, schemaCode, it } = cxt;
      const { opts, errSchemaPath, schemaEnv, self: self2 } = it;
      if (!opts.validateFormats)
        return;
      if ($data)
        validate$DataFormat();
      else
        validateFormat();
      function validate$DataFormat() {
        const fmts = gen.scopeValue("formats", {
          ref: self2.formats,
          code: opts.code.formats
        });
        const fDef = gen.const("fDef", (0, codegen_1$1._)`${fmts}[${schemaCode}]`);
        const fType = gen.let("fType");
        const format2 = gen.let("format");
        gen.if((0, codegen_1$1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1$1._)`${fDef}.type || "string"`).assign(format2, (0, codegen_1$1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1$1._)`"string"`).assign(format2, fDef));
        cxt.fail$data((0, codegen_1$1.or)(unknownFmt(), invalidFmt()));
        function unknownFmt() {
          if (opts.strictSchema === false)
            return codegen_1$1.nil;
          return (0, codegen_1$1._)`${schemaCode} && !${format2}`;
        }
        function invalidFmt() {
          const callFormat = schemaEnv.$async ? (0, codegen_1$1._)`(${fDef}.async ? await ${format2}(${data}) : ${format2}(${data}))` : (0, codegen_1$1._)`${format2}(${data})`;
          const validData = (0, codegen_1$1._)`(typeof ${format2} == "function" ? ${callFormat} : ${format2}.test(${data}))`;
          return (0, codegen_1$1._)`${format2} && ${format2} !== true && ${fType} === ${ruleType} && !${validData}`;
        }
      }
      function validateFormat() {
        const formatDef = self2.formats[schema];
        if (!formatDef) {
          unknownFormat();
          return;
        }
        if (formatDef === true)
          return;
        const [fmtType, format2, fmtRef] = getFormat(formatDef);
        if (fmtType === ruleType)
          cxt.pass(validCondition());
        function unknownFormat() {
          if (opts.strictSchema === false) {
            self2.logger.warn(unknownMsg());
            return;
          }
          throw new Error(unknownMsg());
          function unknownMsg() {
            return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
          }
        }
        function getFormat(fmtDef) {
          const code2 = fmtDef instanceof RegExp ? (0, codegen_1$1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1$1._)`${opts.code.formats}${(0, codegen_1$1.getProperty)(schema)}` : void 0;
          const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code: code2 });
          if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
            return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1$1._)`${fmt}.validate`];
          }
          return ["string", fmtDef, fmt];
        }
        function validCondition() {
          if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
            if (!schemaEnv.$async)
              throw new Error("async format in sync schema");
            return (0, codegen_1$1._)`await ${fmtRef}(${data})`;
          }
          return typeof format2 == "function" ? (0, codegen_1$1._)`${fmtRef}(${data})` : (0, codegen_1$1._)`${fmtRef}.test(${data})`;
        }
      }
    }
  };
  format$1.default = def$1;
  Object.defineProperty(format$2, "__esModule", { value: true });
  const format_1$1 = format$1;
  const format = [format_1$1.default];
  format$2.default = format;
  var metadata = {};
  Object.defineProperty(metadata, "__esModule", { value: true });
  metadata.contentVocabulary = metadata.metadataVocabulary = void 0;
  metadata.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ];
  metadata.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ];
  Object.defineProperty(draft7, "__esModule", { value: true });
  const core_1 = core$1;
  const validation_1 = validation$1;
  const applicator_1 = applicator;
  const format_1 = format$2;
  const metadata_1 = metadata;
  const draft7Vocabularies = [
    core_1.default,
    validation_1.default,
    (0, applicator_1.default)(),
    format_1.default,
    metadata_1.metadataVocabulary,
    metadata_1.contentVocabulary
  ];
  draft7.default = draft7Vocabularies;
  var discriminator = {};
  var types = {};
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiscrError = void 0;
    (function(DiscrError) {
      DiscrError["Tag"] = "tag";
      DiscrError["Mapping"] = "mapping";
    })(exports.DiscrError || (exports.DiscrError = {}));
  })(types);
  Object.defineProperty(discriminator, "__esModule", { value: true });
  const codegen_1 = codegen;
  const types_1 = types;
  const compile_1 = compile;
  const util_1 = util;
  const error = {
    message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
    params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
  };
  const def = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error,
    code(cxt) {
      const { gen, data, schema, parentSchema, it } = cxt;
      const { oneOf: oneOf2 } = parentSchema;
      if (!it.opts.discriminator) {
        throw new Error("discriminator: requires discriminator option");
      }
      const tagName = schema.propertyName;
      if (typeof tagName != "string")
        throw new Error("discriminator: requires propertyName");
      if (schema.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!oneOf2)
        throw new Error("discriminator: requires oneOf keyword");
      const valid = gen.let("valid", false);
      const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
      gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
      cxt.ok(valid);
      function validateMapping() {
        const mapping = getMapping();
        gen.if(false);
        for (const tagValue in mapping) {
          gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
          gen.assign(valid, applyTagSchema(mapping[tagValue]));
        }
        gen.else();
        cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
        gen.endIf();
      }
      function applyTagSchema(schemaProp) {
        const _valid = gen.name("valid");
        const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
        cxt.mergeEvaluated(schCxt, codegen_1.Name);
        return _valid;
      }
      function getMapping() {
        var _a;
        const oneOfMapping = {};
        const topRequired = hasRequired(parentSchema);
        let tagRequired = true;
        for (let i = 0; i < oneOf2.length; i++) {
          let sch = oneOf2[i];
          if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
            sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, sch === null || sch === void 0 ? void 0 : sch.$ref);
            if (sch instanceof compile_1.SchemaEnv)
              sch = sch.schema;
          }
          const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
          if (typeof propSch != "object") {
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
          }
          tagRequired = tagRequired && (topRequired || hasRequired(sch));
          addMappings(propSch, i);
        }
        if (!tagRequired)
          throw new Error(`discriminator: "${tagName}" must be required`);
        return oneOfMapping;
        function hasRequired({ required: required2 }) {
          return Array.isArray(required2) && required2.includes(tagName);
        }
        function addMappings(sch, i) {
          if (sch.const) {
            addMapping(sch.const, i);
          } else if (sch.enum) {
            for (const tagValue of sch.enum) {
              addMapping(tagValue, i);
            }
          } else {
            throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
          }
        }
        function addMapping(tagValue, i) {
          if (typeof tagValue != "string" || tagValue in oneOfMapping) {
            throw new Error(`discriminator: "${tagName}" values must be unique strings`);
          }
          oneOfMapping[tagValue] = i;
        }
      }
    }
  };
  discriminator.default = def;
  const $schema = "http://json-schema.org/draft-07/schema#";
  const $id = "http://json-schema.org/draft-07/schema#";
  const title = "Core schema meta-schema";
  const definitions = {
    schemaArray: {
      type: "array",
      minItems: 1,
      items: {
        $ref: "#"
      }
    },
    nonNegativeInteger: {
      type: "integer",
      minimum: 0
    },
    nonNegativeIntegerDefault0: {
      allOf: [
        {
          $ref: "#/definitions/nonNegativeInteger"
        },
        {
          "default": 0
        }
      ]
    },
    simpleTypes: {
      "enum": [
        "array",
        "boolean",
        "integer",
        "null",
        "number",
        "object",
        "string"
      ]
    },
    stringArray: {
      type: "array",
      items: {
        type: "string"
      },
      uniqueItems: true,
      "default": []
    }
  };
  const type = [
    "object",
    "boolean"
  ];
  const properties = {
    $id: {
      type: "string",
      format: "uri-reference"
    },
    $schema: {
      type: "string",
      format: "uri"
    },
    $ref: {
      type: "string",
      format: "uri-reference"
    },
    $comment: {
      type: "string"
    },
    title: {
      type: "string"
    },
    description: {
      type: "string"
    },
    "default": true,
    readOnly: {
      type: "boolean",
      "default": false
    },
    examples: {
      type: "array",
      items: true
    },
    multipleOf: {
      type: "number",
      exclusiveMinimum: 0
    },
    maximum: {
      type: "number"
    },
    exclusiveMaximum: {
      type: "number"
    },
    minimum: {
      type: "number"
    },
    exclusiveMinimum: {
      type: "number"
    },
    maxLength: {
      $ref: "#/definitions/nonNegativeInteger"
    },
    minLength: {
      $ref: "#/definitions/nonNegativeIntegerDefault0"
    },
    pattern: {
      type: "string",
      format: "regex"
    },
    additionalItems: {
      $ref: "#"
    },
    items: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/schemaArray"
        }
      ],
      "default": true
    },
    maxItems: {
      $ref: "#/definitions/nonNegativeInteger"
    },
    minItems: {
      $ref: "#/definitions/nonNegativeIntegerDefault0"
    },
    uniqueItems: {
      type: "boolean",
      "default": false
    },
    contains: {
      $ref: "#"
    },
    maxProperties: {
      $ref: "#/definitions/nonNegativeInteger"
    },
    minProperties: {
      $ref: "#/definitions/nonNegativeIntegerDefault0"
    },
    required: {
      $ref: "#/definitions/stringArray"
    },
    additionalProperties: {
      $ref: "#"
    },
    definitions: {
      type: "object",
      additionalProperties: {
        $ref: "#"
      },
      "default": {}
    },
    properties: {
      type: "object",
      additionalProperties: {
        $ref: "#"
      },
      "default": {}
    },
    patternProperties: {
      type: "object",
      additionalProperties: {
        $ref: "#"
      },
      propertyNames: {
        format: "regex"
      },
      "default": {}
    },
    dependencies: {
      type: "object",
      additionalProperties: {
        anyOf: [
          {
            $ref: "#"
          },
          {
            $ref: "#/definitions/stringArray"
          }
        ]
      }
    },
    propertyNames: {
      $ref: "#"
    },
    "const": true,
    "enum": {
      type: "array",
      items: true,
      minItems: 1,
      uniqueItems: true
    },
    type: {
      anyOf: [
        {
          $ref: "#/definitions/simpleTypes"
        },
        {
          type: "array",
          items: {
            $ref: "#/definitions/simpleTypes"
          },
          minItems: 1,
          uniqueItems: true
        }
      ]
    },
    format: {
      type: "string"
    },
    contentMediaType: {
      type: "string"
    },
    contentEncoding: {
      type: "string"
    },
    "if": {
      $ref: "#"
    },
    then: {
      $ref: "#"
    },
    "else": {
      $ref: "#"
    },
    allOf: {
      $ref: "#/definitions/schemaArray"
    },
    anyOf: {
      $ref: "#/definitions/schemaArray"
    },
    oneOf: {
      $ref: "#/definitions/schemaArray"
    },
    not: {
      $ref: "#"
    }
  };
  const require$$3 = {
    $schema,
    $id,
    title,
    definitions,
    type,
    properties,
    "default": true
  };
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
    const core_12 = core$2;
    const draft7_1 = draft7;
    const discriminator_1 = discriminator;
    const draft7MetaSchema = require$$3;
    const META_SUPPORT_DATA = ["/properties"];
    const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    class Ajv extends core_12.default {
      _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
          this.addKeyword(discriminator_1.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
          return;
        const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
    }
    module.exports = exports = Ajv;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Ajv;
    var validate_12 = validate;
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_12.KeywordCxt;
    } });
    var codegen_12 = codegen;
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_12._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_12.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_12.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_12.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_12.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_12.CodeGen;
    } });
    var validation_error_12 = validation_error;
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function() {
      return validation_error_12.default;
    } });
    var ref_error_12 = ref_error;
    Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function() {
      return ref_error_12.default;
    } });
  })(ajv, ajv.exports);
  var ajvExports = ajv.exports;
  const AjvModule = /* @__PURE__ */ getDefaultExportFromCjs(ajvExports);
  class StateLoader extends TreeNode {
    constructor(state) {
      var _a;
      super((_a = state.parent) == null ? void 0 : _a.loader);
      __privateAdd(this, _resolveBases);
      __publicField(this, "cache", /* @__PURE__ */ new Map());
      __publicField(this, "report");
      __publicField(this, "state");
      __privateAdd(this, _request, void 0);
      __privateAdd(this, _response, void 0);
      __privateAdd(this, _dataParsed, void 0);
      __privateAdd(this, _data, void 0);
      const reportOrigin = state.originUrl;
      this.state = state;
      this.report = state.parent ? mustExist(state.parent.loader).report.child(new Report(reportOrigin)) : new Report(reportOrigin);
    }
    get data() {
      return __privateGet(this, _data);
    }
    get request() {
      return __privateGet(this, _request);
    }
    get response() {
      return __privateGet(this, _response);
    }
    async load(cache = this.cache) {
      const entry = performance.now();
      let data;
      let timeHttp = 0;
      try {
        const cached = cache.get(this.state.originUrl);
        if (cached) {
          this.report.log(`✅ Using existing request from cache.`);
        } else {
          this.report.log("🔍 Resolving document from URL...");
        }
        const start = performance.now();
        const requestExecutor = async () => {
          __privateSet(this, _request, (cached == null ? void 0 : cached.request) ?? fetch(this.state.originUrl));
          if (!cached) {
            cache.set(this.state.originUrl, this);
          }
          __privateSet(this, _response, (cached == null ? void 0 : cached.response) ?? await __privateGet(this, _request));
          __privateSet(this, _dataParsed, cached && __privateGet(cached, _dataParsed) ? __privateGet(cached, _dataParsed) : __privateGet(this, _response).json());
          return (cached == null ? void 0 : cached.data) ?? await __privateGet(this, _dataParsed);
        };
        data = await retry(requestExecutor, 300, 3);
        const end = performance.now();
        timeHttp = end - start;
      } catch (error2) {
        this.report.log(
          `😑 Error while resolving ${this.state.originUrl}!`,
          errorToRecord(unknownToError(error2))
        );
        return this.report;
      }
      __privateSet(this, _data, data);
      const bases = await __privateMethod(this, _resolveBases, resolveBases_fn).call(this, __privateGet(this, _data), cache);
      if (bases.length === 0) {
        this.report.log("🍁 Profile is a leaf node.");
      } else {
        this.report.log("🌳 Profile is a tree node.");
      }
      const exit = performance.now();
      const timeSelf = exit - entry - timeHttp;
      this.report.log(
        `😊 Profile resolved successfully. (req:${Math.round(timeHttp)}ms, self:${Math.round(
          timeSelf
        )}ms)`
      );
      return this.report;
    }
  }
  _request = new WeakMap();
  _response = new WeakMap();
  _dataParsed = new WeakMap();
  _data = new WeakMap();
  _resolveBases = new WeakSet();
  resolveBases_fn = async function(state, cache = this.cache) {
    if (!Array.isArray(state.extends) || state.extends.length === 0) {
      return Promise.resolve([]);
    }
    this.report.log("🧶 Resolving bases...");
    for (const base of state.extends) {
      const baseState = this.state.child(new State(base, this.state));
      this.child(baseState.loader);
    }
    return Promise.all([...this.children.values()].map((loader) => loader.load(cache)));
  };
  class StateMerger {
    constructor(state) {
      __publicField(this, "state");
      this.state = state;
    }
    merge(base) {
      let stateSubject = base;
      for (const child of this.state.children) {
        let childState = mustExist(child.state);
        if (child.children.size !== 0) {
          childState = new StateMerger(child).merge(stateSubject);
        }
        stateSubject = deepMergeLeft(stateSubject, childState);
      }
      stateSubject = deepMergeLeft(stateSubject, mustExist(this.state.state));
      stateSubject.$schema = "https://schema.kitten-science.com/working-draft/settings-profile.schema.json";
      delete stateSubject.extends;
      return stateSubject;
    }
  }
  const _State = class _State extends TreeNode {
    constructor(originUrl, parent) {
      super(parent);
      __publicField(this, "originUrl");
      __publicField(this, "loader");
      if (!originUrl.startsWith("https://kitten-science.com/")) {
        if (!originUrl.startsWith("data:") || !_State.ALLOW_DATA_URL_IMPORT) {
          throw new InvalidOperationError(
            "While state import is experimental, you can only import from 'https://kitten-science.com/'!"
          );
        }
      }
      this.originUrl = originUrl;
      this.loader = new StateLoader(this);
    }
    get state() {
      var _a;
      return (_a = this.loader) == null ? void 0 : _a.data;
    }
    async resolve() {
      const report = await this.loader.load();
      return { loader: this.loader, report };
    }
    async validate() {
      const schemaBaselineRequest = await fetch(
        "https://schema.kitten-science.com/working-draft/baseline/engine-state.schema.json"
      );
      const schemaProfileRequest = await fetch(
        "https://schema.kitten-science.com/working-draft/settings-profile.schema.json"
      );
      const schemaBaseline = await schemaBaselineRequest.json();
      const schemaProfile = await schemaProfileRequest.json();
      const Ajv = AjvModule.default;
      const ajv2 = new Ajv({ allErrors: true, verbose: true });
      const validateBaseline = ajv2.compile(schemaBaseline);
      const validateProfile = ajv2.compile(schemaProfile);
      const validateLoader = (loader) => {
        const data = loader.data;
        const isValidBaseline = validateBaseline(data);
        const isValidProfile = validateProfile(data);
        if (isValidProfile && !isValidBaseline) {
          console.log(`VALID Profile: ${loader.state.originUrl})`);
          return true;
        }
        if (isValidProfile && isValidBaseline) {
          console.log(`VALID Baseline: ${loader.state.originUrl})`);
          return true;
        }
        console.log(`INVALID: ${loader.state.originUrl})`);
        return false;
      };
      const validateNode = (node) => {
        let childrenValid = true;
        if (0 < node.children.size) {
          for (const child of node.children) {
            const childValid = validateNode(child);
            if (!childValid) {
              childrenValid = false;
            }
          }
        }
        return validateLoader(node.loader) && childrenValid;
      };
      return validateNode(this);
    }
    merge() {
      return new StateMerger(this).merge(UserScript.unknownAsEngineStateOrThrow({ v: "2.0.0" }));
    }
  };
  __publicField(_State, "ALLOW_DATA_URL_IMPORT", false);
  let State = _State;
  class Icons {
  }
  /**
   * camping_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Bonfire", "M4 44v-9.15L22.15 10.3 18.8 5.8l2.45-1.75L24 7.8l2.8-3.75 2.4 1.75-3.3 4.5L44 34.85V44Zm20-31.15-17 23V41h7.25L24 27.35 33.75 41H41v-5.15ZM17.95 41h12.1L24 32.5ZM24 27.35 33.75 41 24 27.35 14.25 41Z");
  /**
   * check_box_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "CheckboxCheck", "M20.95 31.95 35.4 17.5l-2.15-2.15-12.3 12.3L15 21.7l-2.15 2.15ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z");
  /**
   * check_box_outline_blank_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "CheckboxUnCheck", "M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30Z");
  /**
   * content_copy_FILL0_wght400_GRAD0_opsz48F
   */
  __publicField(Icons, "Copy", "M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z");
  /**
   * event_repeat_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Cycles", "M9 44q-1.2 0-2.1-.9Q6 42.2 6 41V10q0-1.2.9-2.1Q7.8 7 9 7h3.25V4h3.25v3h17V4h3.25v3H39q1.2 0 2.1.9.9.9.9 2.1v15h-3v-5.5H9V41h16.2v3Zm29 4q-3.65 0-6.375-2.275T28.2 40h3.1q.65 2.2 2.475 3.6Q35.6 45 38 45q2.9 0 4.95-2.05Q45 40.9 45 38q0-2.9-2.05-4.95Q40.9 31 38 31q-1.45 0-2.7.525-1.25.525-2.2 1.475H36v3h-8v-8h3v2.85q1.35-1.3 3.15-2.075Q35.95 28 38 28q4.15 0 7.075 2.925T48 38q0 4.15-2.925 7.075T38 48ZM9 16.5h30V10H9Zm0 0V10v6.5Z");
  /**
   * delete_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Delete", "M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z");
  /**
   * publish_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Import", "M22.5 40V21.45l-6 6-2.15-2.15L24 15.65l9.65 9.65-2.15 2.15-6-6V40ZM8 18.15V11q0-1.2.9-2.1Q9.8 8 11 8h26q1.2 0 2.1.9.9.9.9 2.1v7.15h-3V11H11v7.15Z");
  /**
   * synagogue_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Religion", "M2 42V14q0-2.3 1.6-3.9t3.9-1.6q2.3 0 3.9 1.6T13 14v1.55L24 6l11 9.55V14q0-2.3 1.6-3.9t3.9-1.6q2.3 0 3.9 1.6T46 14v28H26.5V32q0-1.05-.725-1.775Q25.05 29.5 24 29.5q-1.05 0-1.775.725Q21.5 30.95 21.5 32v10Zm36-25.5h5V14q0-1.05-.725-1.775-.725-.725-1.775-.725-1.05 0-1.775.725Q38 12.95 38 14Zm-33 0h5V14q0-1.05-.725-1.775Q8.55 11.5 7.5 11.5q-1.05 0-1.775.725Q5 12.95 5 14ZM5 39h5V19.5H5Zm8 0h5.5v-7q0-2.3 1.6-3.9t3.9-1.6q2.3 0 3.9 1.6t1.6 3.9v7H35V19.5L24 9.95 13 19.5Zm25 0h5V19.5h-5ZM24 22.75q-1.15 0-1.95-.8t-.8-1.95q0-1.15.8-1.95t1.95-.8q1.15 0 1.95.8t.8 1.95q0 1.15-.8 1.95t-1.95.8Z");
  /**
   * refresh_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Reset", "M24 40q-6.65 0-11.325-4.675Q8 30.65 8 24q0-6.65 4.675-11.325Q17.35 8 24 8q4.25 0 7.45 1.725T37 14.45V8h3v12.7H27.3v-3h8.4q-1.9-3-4.85-4.85Q27.9 11 24 11q-5.45 0-9.225 3.775Q11 18.55 11 24q0 5.45 3.775 9.225Q18.55 37 24 37q4.15 0 7.6-2.375 3.45-2.375 4.8-6.275h3.1q-1.45 5.25-5.75 8.45Q29.45 40 24 40Z");
  /**
   * construction_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Workshop", "M38.4 42 25.85 29.45l2.85-2.85 12.55 12.55ZM9.35 42 6.5 39.15 21 24.65l-5.35-5.35-1.15 1.15-2.2-2.2v4.25l-1.2 1.2L5 17.6l1.2-1.2h4.3L8.1 14l6.55-6.55q.85-.85 1.85-1.15 1-.3 2.2-.3 1.2 0 2.2.425 1 .425 1.85 1.275l-5.35 5.35 2.4 2.4-1.2 1.2 5.2 5.2 6.1-6.1q-.4-.65-.625-1.5-.225-.85-.225-1.8 0-2.65 1.925-4.575Q32.9 5.95 35.55 5.95q.75 0 1.275.15.525.15.875.4l-4.25 4.25 3.75 3.75 4.25-4.25q.25.4.425.975t.175 1.325q0 2.65-1.925 4.575Q38.2 19.05 35.55 19.05q-.9 0-1.55-.125t-1.2-.375Z");
  /**
   * shelves_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Resources", "M6 46V2h3v4h30V2h3v44h-3v-4H9v4Zm3-23.45h5.5v-8h11v8H39V9H9ZM9 39h13.5v-8h11v8H39V25.55H9Zm8.5-16.45h5v-5h-5Zm8 16.45h5v-5h-5Zm-8-16.45h5Zm8 16.45h5Z");
  /**
   * date_range_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Seasons", "M15.3 28.3q-.85 0-1.425-.575-.575-.575-.575-1.425 0-.85.575-1.425.575-.575 1.425-.575.85 0 1.425.575.575.575.575 1.425 0 .85-.575 1.425-.575.575-1.425.575Zm8.85 0q-.85 0-1.425-.575-.575-.575-.575-1.425 0-.85.575-1.425.575-.575 1.425-.575.85 0 1.425.575.575.575.575 1.425 0 .85-.575 1.425-.575.575-1.425.575Zm8.5 0q-.85 0-1.425-.575-.575-.575-.575-1.425 0-.85.575-1.425.575-.575 1.425-.575.85 0 1.425.575.575.575.575 1.425 0 .85-.575 1.425-.575.575-1.425.575ZM9 44q-1.2 0-2.1-.9Q6 42.2 6 41V10q0-1.2.9-2.1Q7.8 7 9 7h3.25V4h3.25v3h17V4h3.25v3H39q1.2 0 2.1.9.9.9.9 2.1v31q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V19.5H9V41Zm0-24.5h30V10H9Zm0 0V10v6.5Z");
  /**
   * settings_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Settings", "m19.4 44-1-6.3q-.95-.35-2-.95t-1.85-1.25l-5.9 2.7L4 30l5.4-3.95q-.1-.45-.125-1.025Q9.25 24.45 9.25 24q0-.45.025-1.025T9.4 21.95L4 18l4.65-8.2 5.9 2.7q.8-.65 1.85-1.25t2-.9l1-6.35h9.2l1 6.3q.95.35 2.025.925Q32.7 11.8 33.45 12.5l5.9-2.7L44 18l-5.4 3.85q.1.5.125 1.075.025.575.025 1.075t-.025 1.05q-.025.55-.125 1.05L44 30l-4.65 8.2-5.9-2.7q-.8.65-1.825 1.275-1.025.625-2.025.925l-1 6.3ZM24 30.5q2.7 0 4.6-1.9 1.9-1.9 1.9-4.6 0-2.7-1.9-4.6-1.9-1.9-4.6-1.9-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6 0 2.7 1.9 4.6 1.9 1.9 4.6 1.9Zm0-3q-1.45 0-2.475-1.025Q20.5 25.45 20.5 24q0-1.45 1.025-2.475Q22.55 20.5 24 20.5q1.45 0 2.475 1.025Q27.5 22.55 27.5 24q0 1.45-1.025 2.475Q25.45 27.5 24 27.5Zm0-3.5Zm-2.2 17h4.4l.7-5.6q1.65-.4 3.125-1.25T32.7 32.1l5.3 2.3 2-3.6-4.7-3.45q.2-.85.325-1.675.125-.825.125-1.675 0-.85-.1-1.675-.1-.825-.35-1.675L40 17.2l-2-3.6-5.3 2.3q-1.15-1.3-2.6-2.175-1.45-.875-3.2-1.125L26.2 7h-4.4l-.7 5.6q-1.7.35-3.175 1.2-1.475.85-2.625 2.1L10 13.6l-2 3.6 4.7 3.45q-.2.85-.325 1.675-.125.825-.125 1.675 0 .85.125 1.675.125.825.325 1.675L8 30.8l2 3.6 5.3-2.3q1.2 1.2 2.675 2.05Q19.45 35 21.1 35.4Z");
  /**
   * rocket_launch_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Space", "m9.35 20.45 5.3 2.25q.9-1.8 1.925-3.55Q17.6 17.4 18.75 15.8L14.8 15Zm7.7 4.05 6.65 6.65q2.85-1.3 5.35-2.95 2.5-1.65 4.05-3.2 4.05-4.05 5.95-8.3 1.9-4.25 2.05-9.6-5.35.15-9.6 2.05t-8.3 5.95q-1.55 1.55-3.2 4.05-1.65 2.5-2.95 5.35Zm11.45-4.8q-1-1-1-2.475t1-2.475q1-1 2.475-1t2.475 1q1 1 1 2.475t-1 2.475q-1 1-2.475 1t-2.475-1Zm-.75 19.15 5.45-5.45-.8-3.95q-1.6 1.15-3.35 2.175T25.5 33.55Zm16.3-34.7q.45 6.8-1.7 12.4-2.15 5.6-7.1 10.55l-.1.1-.1.1 1.1 5.5q.15.75-.075 1.45-.225.7-.775 1.25l-8.55 8.6-4.25-9.9-8.5-8.5-9.9-4.25 8.6-8.55q.55-.55 1.25-.775.7-.225 1.45-.075l5.5 1.1q.05-.05.1-.075.05-.025.1-.075 4.95-4.95 10.55-7.125 5.6-2.175 12.4-1.725Zm-36.6 27.6Q9.2 30 11.725 29.975 14.25 29.95 16 31.7q1.75 1.75 1.725 4.275Q17.7 38.5 15.95 40.25q-1.3 1.3-4.025 2.15Q9.2 43.25 3.75 44q.75-5.45 1.575-8.2.825-2.75 2.125-4.05Zm2.1 2.15q-.7.75-1.25 2.35t-.95 4.1q2.5-.4 4.1-.95 1.6-.55 2.35-1.25.95-.85.975-2.125.025-1.275-.875-2.225-.95-.9-2.225-.875-1.275.025-2.125.975Z");
  /**
   * keyboard_tab_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "State", "m24 36.05-2.15-2.1 8.45-8.45H4v-3h26.3l-8.4-8.45 2.1-2.1L36.05 24ZM41 36V12h3v24Z");
  /**
   * summarize_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Summary", "M15.45 16.95q.6 0 1.05-.45.45-.45.45-1.05 0-.6-.45-1.05-.45-.45-1.05-.45-.6 0-1.05.45-.45.45-.45 1.05 0 .6.45 1.05.45.45 1.05.45Zm0 8.55q.6 0 1.05-.45.45-.45.45-1.05 0-.6-.45-1.05-.45-.45-1.05-.45-.6 0-1.05.45-.45.45-.45 1.05 0 .6.45 1.05.45.45 1.05.45Zm0 8.55q.6 0 1.05-.45.45-.45.45-1.05 0-.6-.45-1.05-.45-.45-1.05-.45-.6 0-1.05.45-.45.45-.45 1.05 0 .6.45 1.05.45.45 1.05.45ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h23.1l9.9 9.9V39q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V17.55h-8.55V9H9v30ZM9 9v8.55V9v30V9Z");
  /**
   * sync_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Sync", "M8.35 40v-3h6.5l-.75-.6q-3.2-2.55-4.65-5.55-1.45-3-1.45-6.7 0-5.3 3.125-9.525Q14.25 10.4 19.35 8.8v3.1q-3.75 1.45-6.05 4.825T11 24.15q0 3.15 1.175 5.475 1.175 2.325 3.175 4.025l1.5 1.05v-6.2h3V40Zm20.35-.75V36.1q3.8-1.45 6.05-4.825T37 23.85q0-2.4-1.175-4.875T32.75 14.6l-1.45-1.3v6.2h-3V8h11.5v3h-6.55l.75.7q3 2.8 4.5 6t1.5 6.15q0 5.3-3.1 9.55-3.1 4.25-8.2 5.85Z");
  /**
   * schedule_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Time", "m31.35 33.65 2.25-2.25-7.95-8V13.35h-3V24.6ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24t1.575-7.75q1.575-3.65 4.3-6.375 2.725-2.725 6.375-4.3Q19.9 4 24 4t7.75 1.575q3.65 1.575 6.375 4.3 2.725 2.725 4.3 6.375Q44 19.9 44 24t-1.575 7.75q-1.575 3.65-4.3 6.375-2.725 2.725-6.375 4.3Q28.1 44 24 44Zm0-20Zm0 17q7 0 12-5t5-12q0-7-5-12T24 7q-7 0-12 5T7 24q0 7 5 12t12 5Z");
  /**
   * bolt_FILL0_wght400_GRAD0_opsz48
   */
  __publicField(Icons, "Trigger", "M19.95 42 22 27.9h-7.3q-.55 0-.8-.5t0-.95L26.15 6h2.05l-2.05 14.05h7.2q.55 0 .825.5.275.5.025.95L22 42Z");
  class UiComponent extends EventTarget {
    /**
     * Constructs the base `UiComponent`.
     * Subclasses MUST add children from options when `this.element` is constructed.
     *
     * @param host A reference to the host.
     * @param options The options for this component.
     */
    constructor(host, options) {
      super();
      /**
       * A reference to the host itself.
       */
      __publicField(this, "_host");
      __publicField(this, "children", /* @__PURE__ */ new Set());
      __publicField(this, "_onRefresh");
      this._host = host;
      this._onRefresh = options == null ? void 0 : options.onRefresh;
    }
    refreshUi() {
      var _a;
      (_a = this._onRefresh) == null ? void 0 : _a.call(this, this);
      for (const child of this.children) {
        try {
          child.refreshUi();
        } catch (error2) {
          cerror("Error while refreshing child component!", error2);
        }
      }
    }
    addChild(child) {
      this.children.add(child);
      this.element.append(child.element);
    }
    addChildren(children) {
      for (const child of children ?? []) {
        this.addChild(child);
      }
    }
    removeChild(child) {
      if (!this.children.has(child)) {
        return;
      }
      child.element.remove();
      this.children.delete(child);
    }
    removeChildren(children) {
      for (const child of children) {
        this.removeChild(child);
      }
    }
    static promptLimit(text, defaultValue) {
      const value = window.prompt(text, defaultValue);
      if (value === null || value === "") {
        return null;
      }
      const hasSuffix = /[KMGT]$/.test(value);
      const baseValue = value.substring(0, value.length - (hasSuffix ? 1 : 0));
      let numericValue = value.includes("e") || hasSuffix ? parseFloat(baseValue) : parseInt(baseValue);
      if (hasSuffix) {
        const suffix = value.substring(value.length - 1);
        numericValue = numericValue * Math.pow(1e3, ["", "K", "M", "G", "T"].indexOf(suffix));
      }
      if (numericValue === Number.POSITIVE_INFINITY || numericValue < 0) {
        numericValue = -1;
      }
      return numericValue;
    }
    static promptPercentage(text, defaultValue) {
      const value = window.prompt(text, defaultValue);
      if (value === null || value === "") {
        return null;
      }
      return Math.max(0, Math.min(1, parseFloat(value)));
    }
    _renderLimit(value) {
      return UiComponent.renderLimit(value, this._host);
    }
    static renderLimit(value, host) {
      if (value < 0 || value === Number.POSITIVE_INFINITY) {
        return "∞";
      }
      return host.game.getDisplayValueExt(value);
    }
    static renderPercentage(value) {
      return value.toFixed(3);
    }
    static promptFloat(text, defaultValue) {
      const value = window.prompt(text, defaultValue);
      if (value === null || value === "") {
        return null;
      }
      return parseFloat(value);
    }
    static renderFloat(value) {
      return value.toFixed(3);
    }
  }
  class ListItem extends UiComponent {
    /**
     * Construct a new simple list item with only a label.
     *
     * @param host The userscript instance.
     * @param options Options for the list item.
     */
    constructor(host, options) {
      super(host, options);
      __publicField(this, "element");
      const element = $("<li/>");
      element.addClass("ks-setting");
      if ((options == null ? void 0 : options.delimiter) === true) {
        element.addClass("ks-delimiter");
      }
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
    }
  }
  class LabelListItem extends ListItem {
    /**
     * Construct a new label list item.
     *
     * @param host The userscript instance.
     * @param label The label on the setting element.
     * @param options Options for the list item.
     */
    constructor(host, label, options) {
      super(host, options);
      __publicField(this, "elementLabel");
      this.elementLabel = $("<label/>", {
        text: `${(options == null ? void 0 : options.upgradeIndicator) === true ? `⮤ ` : ""}${label}`
      }).addClass("ks-label");
      this.element.append(this.elementLabel);
      if (options == null ? void 0 : options.icon) {
        const iconElement = $("<div/>", {
          html: `<svg style="width: 15px; height: 15px;" viewBox="0 0 48 48"><path fill="currentColor" d="${options.icon}"/></svg>`
        }).addClass("ks-icon-label");
        iconElement.insertBefore(this.elementLabel);
      }
    }
  }
  class SettingListItem extends LabelListItem {
    /**
     * Construct a new setting element.
     * This is a simple checkbox with a label.
     *
     * @param host The userscript instance.
     * @param label The label on the setting element.
     * @param setting The setting this element is linked to.
     * @param options Options for this list item.
     */
    constructor(host, label, setting, options) {
      super(host, label, options);
      __publicField(this, "setting");
      __publicField(this, "checkbox");
      __publicField(this, "readOnly");
      const checkbox = $("<input/>", {
        type: "checkbox"
      }).addClass("ks-checkbox");
      this.readOnly = (options == null ? void 0 : options.readOnly) ?? false;
      checkbox.prop("disabled", this.readOnly);
      checkbox.on("change", () => {
        var _a, _b;
        if (checkbox.is(":checked") && setting.enabled === false) {
          setting.enabled = true;
          (_a = options == null ? void 0 : options.onCheck) == null ? void 0 : _a.call(options);
        } else if (!checkbox.is(":checked") && setting.enabled === true) {
          setting.enabled = false;
          (_b = options == null ? void 0 : options.onUnCheck) == null ? void 0 : _b.call(options);
        }
      });
      this.elementLabel.prepend(checkbox);
      this.checkbox = checkbox;
      this.addChildren(options == null ? void 0 : options.children);
      this.setting = setting;
    }
    refreshUi() {
      super.refreshUi();
      if (!isNil(this.checkbox)) {
        this.checkbox.prop("checked", this.setting.enabled);
        this.checkbox.prop("disabled", this.readOnly);
      }
    }
  }
  class IconButton extends UiComponent {
    /**
     * Constructs a `IconButton`.
     *
     * @param host A reference to the host.
     * @param pathData The SVG path data of the icon.
     * @param title The `title` of the element.
     * @param options Options for the icon button.
     */
    constructor(host, pathData, title2, options) {
      super(host, options);
      __publicField(this, "element");
      const element = $("<div/>", {
        html: `<svg style="width: 18px; height: 18px;" viewBox="0 0 48 48"><path fill="currentColor" d="${pathData}"/></svg>`,
        title: title2
      }).addClass("ks-icon-button");
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
    }
  }
  class DisableButton extends IconButton {
    /**
     * Constructs a `DisableButton`.
     *
     * @param host A reference to the host.
     */
    constructor(host) {
      super(host, Icons.CheckboxUnCheck, host.engine.i18n("ui.disable.all"));
    }
  }
  class EnableButton extends IconButton {
    /**
     * Constructs a `EnableButton`.
     *
     * @param host A reference to the host.
     */
    constructor(host) {
      super(host, Icons.CheckboxCheck, host.engine.i18n("ui.enable.all"));
    }
  }
  class ResetButton extends IconButton {
    /**
     * Constructs a `RefreshButton`.
     *
     * @param host A reference to the host.
     */
    constructor(host) {
      super(host, Icons.Reset, host.engine.i18n("ui.reset"));
    }
  }
  class SettingsList extends UiComponent {
    /**
     * Constructs a `SettingsList`.
     *
     * @param host A reference to the host.
     * @param options Which tools should be available on the list?
     */
    constructor(host, options) {
      super(host, { ...options, children: [] });
      __publicField(this, "element");
      __publicField(this, "list");
      __publicField(this, "disableAllButton");
      __publicField(this, "enableAllButton");
      __publicField(this, "resetButton");
      const toolOptions = {
        hasDisableAll: true,
        hasEnableAll: true,
        ...options
      };
      const hasTools = toolOptions.hasDisableAll || toolOptions.hasEnableAll || !isNil(toolOptions.onReset);
      const container = $("<div/>").addClass("ks-list-container");
      this.list = $("<ul/>").addClass("ks-list").addClass("ks-items-list");
      container.append(this.list);
      if (hasTools) {
        const tools = $("<div/>").addClass("ks-list-tools");
        if (toolOptions.hasEnableAll) {
          const onEnableAll = options == null ? void 0 : options.onEnableAll;
          this.enableAllButton = new EnableButton(this._host);
          this.enableAllButton.element.on("click", () => {
            const event = new Event("enableAll", { cancelable: true });
            this.dispatchEvent(event);
            if (event.defaultPrevented) {
              return;
            }
            for (const child of this.children) {
              if (is(child, SettingListItem)) {
                child.setting.enabled = true;
              }
            }
            if (!isNil(onEnableAll)) {
              onEnableAll();
            }
            this.refreshUi();
          });
          tools.append(this.enableAllButton.element);
        }
        if (toolOptions.hasDisableAll) {
          const onDisableAll = options == null ? void 0 : options.onDisableAll;
          this.disableAllButton = new DisableButton(this._host);
          this.disableAllButton.element.on("click", () => {
            const event = new Event("disableAll", { cancelable: true });
            this.dispatchEvent(event);
            if (event.defaultPrevented) {
              return;
            }
            for (const child of this.children) {
              if (is(child, SettingListItem)) {
                child.setting.enabled = false;
              }
            }
            if (!isNil(onDisableAll)) {
              onDisableAll();
            }
            this.refreshUi();
          });
          tools.append(this.disableAllButton.element);
        }
        const onReset = toolOptions.onReset;
        if (!isNil(onReset)) {
          this.resetButton = new ResetButton(this._host);
          this.resetButton.element.on("click", () => onReset());
          tools.append(this.resetButton.element);
        }
        container.append(tools);
      }
      this.element = container;
      this.addChildren(options == null ? void 0 : options.children);
    }
    addChild(child) {
      this.children.add(child);
      this.list.append(child.element);
    }
  }
  class Container extends UiComponent {
    /**
     * Constructs a simple container element without any special properties.
     *
     * @param host A reference to the host.
     * @param options Options for the container.
     */
    constructor(host, options) {
      super(host, options);
      __publicField(this, "element");
      const element = $("<div/>");
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
    }
  }
  class ExpandoButton extends UiComponent {
    /**
     * Constructs an expando element that is commonly used to expand and
     * collapses a section of the UI.
     *
     * @param host A reference to the host.
     * @param options Options for this expando.
     */
    constructor(host, options) {
      super(host, options);
      __publicField(this, "element");
      const element = $("<div/>", {
        title: host.engine.i18n("ui.itemsShow"),
        text: "+"
      }).addClass("ks-expando-button");
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
    }
    setCollapsed() {
      this.element.prop("title", this._host.engine.i18n("ui.itemsShow"));
      this.element.text("+");
    }
    setExpanded() {
      this.element.prop("title", this._host.engine.i18n("ui.itemsHide"));
      this.element.text("-");
    }
  }
  class CollapsiblePanel extends UiComponent {
    /**
     * Constructs a settings panel that is used to contain a single child element.
     *
     * @param host A reference to the host.
     * @param head Another component to host in the head of the panel.
     * @param options Options for this panel.
     */
    constructor(host, head, options) {
      super(host, options);
      __publicField(this, "container");
      __publicField(this, "element");
      __publicField(this, "_expando");
      __publicField(this, "_head");
      __publicField(this, "_mainChildVisible");
      __publicField(this, "parent");
      this.container = new Container(host);
      this.container.element.addClass("ks-panel-content");
      this.children.add(this.container);
      this._head = head;
      this.children.add(head);
      const expando = new ExpandoButton(host);
      expando.element.on("click", () => {
        this.toggle();
      });
      head.element.append(expando.element, this.container.element);
      if (options == null ? void 0 : options.initiallyExpanded) {
        this.container.element.show();
        expando.setExpanded();
      } else {
        this.container.element.hide();
      }
      this._mainChildVisible = (options == null ? void 0 : options.initiallyExpanded) ?? false;
      this.element = head.element;
      this.addChildren(options == null ? void 0 : options.children);
      this._expando = expando;
    }
    get isExpanded() {
      return this._mainChildVisible;
    }
    addChild(child) {
      this.children.add(child);
      this.container.element.append(child.element);
    }
    /**
     * Control the visibility of the panel's contents.
     *
     * @param expand Should the panel be expanded? If not set, the panel is toggled.
     * @param toggleNested Also toggle all panels inside this panel?
     */
    toggle(expand = void 0, toggleNested = false) {
      const visible = expand !== void 0 ? expand : !this._mainChildVisible;
      if (visible !== this._mainChildVisible) {
        this._mainChildVisible = visible;
        if (this._mainChildVisible) {
          this.container.refreshUi();
          this.container.element.show();
          this._expando.setExpanded();
          this._head.element.addClass("ks-expanded");
          this.dispatchEvent(new CustomEvent("panelShown"));
        } else {
          this.container.element.hide();
          this._expando.setCollapsed();
          this._head.element.removeClass("ks-expanded");
          this.dispatchEvent(new CustomEvent("panelHidden"));
        }
      }
      if (toggleNested) {
        const toggleChildren = (children) => {
          for (const child of children) {
            if (is(child, CollapsiblePanel)) {
              child.toggle(expand, toggleNested);
            } else {
              toggleChildren(child.children);
            }
          }
        };
        toggleChildren(this.children);
      }
    }
  }
  class SettingsPanel extends CollapsiblePanel {
    /**
     * Constructs a settings panel that is used to contain a major section of the UI.
     *
     * @param host A reference to the host.
     * @param label The label to put main checkbox of this section.
     * @param setting An setting for which this is the settings panel.
     * @param options Options for this panel.
     */
    constructor(host, label, setting, options) {
      const settingItem = !isNil(options == null ? void 0 : options.settingItem) ? mustExist(options == null ? void 0 : options.settingItem) : new SettingListItem(host, label, setting, {
        onCheck: () => host.engine.imessage("status.auto.enable", [label]),
        onUnCheck: () => host.engine.imessage("status.auto.disable", [label])
      });
      super(host, settingItem, options);
      __publicField(this, "setting");
      __publicField(this, "settingItem");
      this.settingItem = settingItem;
      this.setting = setting;
    }
    get isExpanded() {
      return this._mainChildVisible;
    }
    // SettingListItem interface
    get elementLabel() {
      return this._head.element;
    }
    get readOnly() {
      return true;
    }
    set readOnly(value) {
    }
  }
  class BuildingUpgradeSettingsUi extends SettingsPanel {
    constructor(host, settings, options) {
      super(host, host.engine.i18n("ui.upgrade.buildings"), settings, options);
      const items2 = [];
      for (const setting of Object.values(this.setting.buildings)) {
        const label = this._host.engine.i18n(`$buildings.${setting.upgrade}.label`);
        const button = new SettingListItem(this._host, label, setting, {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [label]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [label])
        });
        items2.push({ label, button });
      }
      items2.sort((a, b) => a.label.localeCompare(b.label));
      const itemsList = new SettingsList(this._host);
      items2.forEach((button) => itemsList.addChild(button.button));
      this.addChild(itemsList);
    }
  }
  class TextButton extends UiComponent {
    constructor(host, label, options) {
      super(host, options);
      __publicField(this, "element");
      __publicField(this, "readOnly");
      const element = $("<div/>").addClass("ks-text-button").text(label);
      const title2 = options == null ? void 0 : options.title;
      if (!isNil(title2)) {
        element.prop("title", title2);
      }
      const onClick = options == null ? void 0 : options.onClick;
      if (!isNil(onClick)) {
        element.on("click", () => {
          if (this.readOnly) {
            return;
          }
          if (!isNil(onClick)) {
            onClick();
          }
        });
      }
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
      this.readOnly = false;
    }
  }
  class MaxButton extends TextButton {
    constructor(host, label, setting, handler = {}) {
      super(host, label, {
        onClick: () => {
          const value = SettingsSectionUi.promptLimit(
            host.engine.i18n("ui.max.set", [label]),
            setting.max.toString()
          );
          if (value !== null) {
            setting.max = value;
            this.refreshUi();
          }
          if (handler.onClick) {
            handler.onClick();
          }
        },
        title: setting.max.toFixed()
      });
      __publicField(this, "setting");
      this.element.addClass("ks-max-button");
      this.setting = setting;
    }
    refreshUi() {
      super.refreshUi();
      this.element.prop("title", this.setting.max.toFixed());
      this.element.text(
        this._host.engine.i18n("ui.max", [
          SettingsSectionUi.renderLimit(this.setting.max, this._host)
        ])
      );
    }
  }
  class SettingMaxListItem extends SettingListItem {
    /**
     * Create a UI element for a setting that can have a maximum.
     * This will result in an element with a labeled checkbox and a "Max" indicator,
     * which controls the respective `max` property in the setting model.
     *
     * @param host The userscript instance.
     * @param label The label for the setting.
     * @param setting The setting model.
     * @param options Options for the list item.
     */
    constructor(host, label, setting, options) {
      super(host, label, setting, options);
      __publicField(this, "maxButton");
      this.maxButton = new MaxButton(host, label, setting);
      this.element.append(this.maxButton.element);
    }
    refreshUi() {
      super.refreshUi();
      this.maxButton.refreshUi();
    }
  }
  class SettingsSectionUi extends SettingsPanel {
    constructor(host, label, settings, options) {
      super(host, label, settings, options);
    }
    _getBuildOption(option, label, delimiter = false, upgradeIndicator = false) {
      return new SettingMaxListItem(this._host, label, option, {
        delimiter,
        onCheck: () => this._host.engine.imessage("status.sub.enable", [label]),
        onUnCheck: () => this._host.engine.imessage("status.sub.disable", [label]),
        upgradeIndicator
      });
    }
  }
  class TriggerButton extends IconButton {
    constructor(host, label, setting, behavior = "percentage", handler = {}) {
      super(host, Icons.Trigger, "");
      __publicField(this, "behavior");
      __publicField(this, "setting");
      this.behavior = behavior;
      this.element.on("click", () => {
        const value = this.behavior === "percentage" ? SettingsSectionUi.promptPercentage(
          host.engine.i18n("ui.trigger.setpercentage", [label]),
          SettingsSectionUi.renderPercentage(setting.trigger)
        ) : SettingsSectionUi.promptLimit(
          host.engine.i18n("ui.trigger.setinteger", [label]),
          setting.trigger.toFixed()
        );
        if (value !== null) {
          setting.trigger = value;
          this.refreshUi();
        }
        if (handler.onClick) {
          handler.onClick();
        }
      });
      this.setting = setting;
    }
    refreshUi() {
      super.refreshUi();
      this.element[0].title = this._host.engine.i18n("ui.trigger", [
        this.behavior === "percentage" ? SettingsSectionUi.renderPercentage(this.setting.trigger) : SettingsSectionUi.renderLimit(this.setting.trigger, this._host)
      ]);
    }
  }
  class HeaderListItem extends UiComponent {
    /**
     * Construct an informational text item.
     * This is purely for cosmetic/informational value in the UI.
     *
     * @param host A reference to the host.
     * @param text The text to appear on the header element.
     * @param options Options for the header.
     */
    constructor(host, text, options) {
      super(host, options);
      __publicField(this, "element");
      const element = $("<li/>", { text }).addClass("ks-header");
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
    }
    get elementLabel() {
      return this.element;
    }
  }
  class BonfireSettingsUi extends SettingsSectionUi {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.build");
      super(host, label, settings);
      __publicField(this, "_trigger");
      this._trigger = new TriggerButton(host, label, settings);
      this._trigger.element.insertAfter(this._expando.element);
      this.children.add(this._trigger);
      const listBuildings = new SettingsList(this._host, {
        children: [
          new HeaderListItem(this._host, this._host.engine.i18n("$buildings.group.food")),
          this._getBuildOption(
            this.setting.buildings.field,
            this._host.engine.i18n("$buildings.field.label")
          ),
          this._getBuildOption(
            this.setting.buildings.pasture,
            this._host.engine.i18n("$buildings.pasture.label")
          ),
          this._getBuildOption(
            this.setting.buildings.solarfarm,
            this._host.engine.i18n("$buildings.solarfarm.label"),
            false,
            true
          ),
          this._getBuildOption(
            this.setting.buildings.aqueduct,
            this._host.engine.i18n("$buildings.aqueduct.label")
          ),
          this._getBuildOption(
            this.setting.buildings.hydroplant,
            this._host.engine.i18n("$buildings.hydroplant.label"),
            true,
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$buildings.group.population")),
          this._getBuildOption(
            this.setting.buildings.hut,
            this._host.engine.i18n("$buildings.hut.label")
          ),
          this._getBuildOption(
            this.setting.buildings.logHouse,
            this._host.engine.i18n("$buildings.logHouse.label")
          ),
          this._getBuildOption(
            this.setting.buildings.mansion,
            this._host.engine.i18n("$buildings.mansion.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$buildings.group.science")),
          this._getBuildOption(
            this.setting.buildings.library,
            this._host.engine.i18n("$buildings.library.label")
          ),
          this._getBuildOption(
            this.setting.buildings.dataCenter,
            this._host.engine.i18n("$buildings.dataCenter.label"),
            false,
            true
          ),
          this._getBuildOption(
            this.setting.buildings.academy,
            this._host.engine.i18n("$buildings.academy.label")
          ),
          this._getBuildOption(
            this.setting.buildings.observatory,
            this._host.engine.i18n("$buildings.observatory.label")
          ),
          this._getBuildOption(
            this.setting.buildings.biolab,
            this._host.engine.i18n("$buildings.biolab.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$buildings.group.storage")),
          this._getBuildOption(
            this.setting.buildings.barn,
            this._host.engine.i18n("$buildings.barn.label")
          ),
          this._getBuildOption(
            this.setting.buildings.harbor,
            this._host.engine.i18n("$buildings.harbor.label")
          ),
          this._getBuildOption(
            this.setting.buildings.warehouse,
            this._host.engine.i18n("$buildings.warehouse.label")
          ),
          this._getBuildOption(
            this.setting.buildings.spaceport,
            this._host.engine.i18n("$buildings.spaceport.label"),
            true,
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$buildings.group.resource")),
          this._getBuildOption(
            this.setting.buildings.mine,
            this._host.engine.i18n("$buildings.mine.label")
          ),
          this._getBuildOption(
            this.setting.buildings.quarry,
            this._host.engine.i18n("$buildings.quarry.label")
          ),
          this._getBuildOption(
            this.setting.buildings.lumberMill,
            this._host.engine.i18n("$buildings.lumberMill.label")
          ),
          this._getBuildOption(
            this.setting.buildings.oilWell,
            this._host.engine.i18n("$buildings.oilWell.label")
          ),
          this._getBuildOption(
            this.setting.buildings.accelerator,
            this._host.engine.i18n("$buildings.accelerator.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$buildings.group.industry")),
          this._getBuildOption(
            this.setting.buildings.steamworks,
            this._host.engine.i18n("$buildings.steamworks.label")
          ),
          this._getBuildOption(
            this.setting.buildings.magneto,
            this._host.engine.i18n("$buildings.magneto.label")
          ),
          this._getBuildOption(
            this.setting.buildings.smelter,
            this._host.engine.i18n("$buildings.smelter.label")
          ),
          this._getBuildOption(
            this.setting.buildings.calciner,
            this._host.engine.i18n("$buildings.calciner.label")
          ),
          this._getBuildOption(
            this.setting.buildings.factory,
            this._host.engine.i18n("$buildings.factory.label")
          ),
          this._getBuildOption(
            this.setting.buildings.reactor,
            this._host.engine.i18n("$buildings.reactor.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$buildings.group.culture")),
          this._getBuildOption(
            this.setting.buildings.amphitheatre,
            this._host.engine.i18n("$buildings.amphitheatre.label")
          ),
          this._getBuildOption(
            this.setting.buildings.broadcasttower,
            this._host.engine.i18n("$buildings.broadcasttower.label"),
            false,
            true
          ),
          this._getBuildOption(
            this.setting.buildings.chapel,
            this._host.engine.i18n("$buildings.chapel.label")
          ),
          this._getBuildOption(
            this.setting.buildings.temple,
            this._host.engine.i18n("$buildings.temple.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$buildings.group.other")),
          this._getBuildOption(
            this.setting.buildings.workshop,
            this._host.engine.i18n("$buildings.workshop.label")
          ),
          this._getBuildOption(
            this.setting.buildings.tradepost,
            this._host.engine.i18n("$buildings.tradepost.label")
          ),
          this._getBuildOption(
            this.setting.buildings.mint,
            this._host.engine.i18n("$buildings.mint.label")
          ),
          this._getBuildOption(
            this.setting.buildings.brewery,
            this._host.engine.i18n("$buildings.brewery.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$buildings.group.megastructures")),
          this._getBuildOption(
            this.setting.buildings.ziggurat,
            this._host.engine.i18n("$buildings.ziggurat.label")
          ),
          this._getBuildOption(
            this.setting.buildings.chronosphere,
            this._host.engine.i18n("$buildings.chronosphere.label")
          ),
          this._getBuildOption(
            this.setting.buildings.aiCore,
            this._host.engine.i18n("$buildings.aicore.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$buildings.group.zebraBuildings")),
          this._getBuildOption(
            this.setting.buildings.zebraOutpost,
            this._host.engine.i18n("$buildings.zebraOutpost.label")
          ),
          this._getBuildOption(
            this.setting.buildings.zebraWorkshop,
            this._host.engine.i18n("$buildings.zebraWorkshop.label")
          ),
          this._getBuildOption(
            this.setting.buildings.zebraForge,
            this._host.engine.i18n("$buildings.zebraForge.label")
          )
        ],
        onReset: () => {
          this.setting.load({ buildings: new BonfireSettings().buildings });
          this.refreshUi();
        }
      });
      this.addChild(listBuildings);
      const listAddition = new SettingsList(this._host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      listAddition.addChild(new HeaderListItem(this._host, "Additional options"));
      listAddition.addChild(new BuildingUpgradeSettingsUi(this._host, this.setting.upgradeBuildings));
      listAddition.addChild(
        new SettingListItem(
          this._host,
          this._host.engine.i18n("option.catnip"),
          this.setting.gatherCatnip,
          {
            onCheck: () => this._host.engine.imessage("status.sub.enable", [
              this._host.engine.i18n("option.catnip")
            ]),
            onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
              this._host.engine.i18n("option.catnip")
            ])
          }
        )
      );
      listAddition.addChild(
        new SettingListItem(
          this._host,
          this._host.engine.i18n("option.steamworks"),
          this.setting.turnOnSteamworks,
          {
            onCheck: () => this._host.engine.imessage("status.sub.enable", [
              this._host.engine.i18n("option.steamworks")
            ]),
            onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
              this._host.engine.i18n("option.steamworks")
            ])
          }
        )
      );
      listAddition.addChild(
        new SettingListItem(
          this._host,
          this._host.engine.i18n("option.magnetos"),
          this.setting.turnOnMagnetos,
          {
            onCheck: () => this._host.engine.imessage("status.sub.enable", [
              this._host.engine.i18n("option.magnetos")
            ]),
            onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
              this._host.engine.i18n("option.magnetos")
            ])
          }
        )
      );
      this.addChild(listAddition);
    }
  }
  class EngineSettingsUi {
    constructor(host, settings) {
      __publicField(this, "element");
      __publicField(this, "expando");
      __publicField(this, "_element");
      __publicField(this, "_settings");
      this._settings = settings;
      const label = ucfirst(host.engine.i18n("ui.engine"));
      this._element = new SettingListItem(host, label, settings, {
        onCheck: () => host.engine.start(true),
        onUnCheck: () => host.engine.stop(true)
      });
      this.element = this._element.element;
      this.expando = new ExpandoButton(host);
      this.element.append(this.expando.element);
    }
    setState(state) {
      this._settings.enabled = state.enabled;
    }
    refreshUi() {
      this.setState(this._settings);
      this._element.refreshUi();
    }
  }
  class ButtonListItem extends ListItem {
    constructor(host, button, options) {
      super(host, options);
      __publicField(this, "button");
      this.button = button;
      this.element.append(button.element);
    }
    refreshUi() {
      super.refreshUi();
      this.button.refreshUi();
    }
  }
  class Fieldset extends UiComponent {
    /**
     * Constructs a `Fieldset`.
     *
     * @param host A reference to the host.
     * @param label The label on the fieldset.
     * @param options Options for the fieldset.
     */
    constructor(host, label, options) {
      super(host, options);
      __publicField(this, "element");
      const element = $("<fieldset/>").addClass("ks-fieldset");
      if (options == null ? void 0 : options.delimiter) {
        element.addClass("ks-delimiter");
      }
      const legend = $("<legend/>").text(label).addClass("ks-label");
      element.append(legend);
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
    }
  }
  class RadioItem extends UiComponent {
    /**
     * Construct a new radio setting element.
     * This is a radio input that is expected to be hosted in a `Fieldset`.
     *
     * @param host The userscript instance.
     * @param setting The setting this element is linked to.
     * @param option The specific option out of the setting that this radio item represents.
     * @param groupKey A unique name for the group of radio items this one belongs to.
     * @param options Options for this radio item.
     */
    constructor(host, setting, option, groupKey, options) {
      super(host, options);
      __publicField(this, "setting");
      __publicField(this, "option");
      __publicField(this, "element");
      __publicField(this, "input");
      __publicField(this, "readOnly");
      const element = $(`<div/>`);
      element.addClass("ks-setting");
      if ((options == null ? void 0 : options.delimiter) === true) {
        element.addClass("ks-delimiter");
      }
      const elementLabel = $("<label/>", {
        text: `${(options == null ? void 0 : options.upgradeIndicator) ? `⮤ ` : ""}${option.label}`
      }).addClass("ks-label");
      const input = $("<input/>", {
        name: groupKey,
        type: "radio"
      }).addClass("ks-radio");
      this.readOnly = (options == null ? void 0 : options.readOnly) ?? false;
      input.on("change", () => {
        this.setting.selected = option.value;
        if (!isNil(options == null ? void 0 : options.onCheck)) {
          options == null ? void 0 : options.onCheck();
        }
      });
      elementLabel.prepend(input);
      element.append(elementLabel);
      this.input = input;
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
      this.setting = setting;
      this.option = option;
    }
    refreshUi() {
      super.refreshUi();
      this.input.prop("disabled", this.readOnly);
    }
  }
  class OptionsListItem extends UiComponent {
    /**
     * Construct a new options setting element.
     * This is a list of options, where the selected option will be put into the setting.
     *
     * @param host The userscript instance.
     * @param label The label on the setting element.
     * @param setting The setting this element is linked to.
     * @param options Options for the list item.
     */
    constructor(host, label, setting, options) {
      super(host, options);
      __publicField(this, "fieldset");
      __publicField(this, "setting");
      __publicField(this, "element");
      __publicField(this, "_options");
      this.element = $(`<li/>`);
      this.fieldset = new Fieldset(host, label);
      this.addChild(this.fieldset);
      this._options = new Array();
      for (const option of setting.options) {
        this._options.push(
          new RadioItem(host, setting, option, label, {
            onCheck: options == null ? void 0 : options.onCheck,
            readOnly: options == null ? void 0 : options.readOnly
          })
        );
      }
      this.fieldset.addChildren(this._options);
      this.setting = setting;
    }
    refreshUi() {
      super.refreshUi();
      for (const option of this._options) {
        if (option.option.value === this.setting.selected) {
          option.input.prop("checked", true);
          break;
        }
      }
    }
  }
  class InternalsUi extends SettingsPanel {
    constructor(host, settings) {
      super(host, "Internals", settings, {
        settingItem: new LabelListItem(host, "Internals", { icon: Icons.Settings }),
        children: [
          new SettingsList(host, {
            children: [
              new ButtonListItem(
                host,
                new TextButton(host, `Interval: ${settings.interval}`, {
                  onClick: () => {
                    const newInterval = SettingsSectionUi.promptLimit(
                      "Enter a new interval at which KS should run (in milliseconds):",
                      settings.interval.toString()
                    );
                    if (isNil(newInterval)) {
                      return;
                    }
                    settings.interval = newInterval;
                    this.refreshUi();
                  },
                  onRefresh: (subject) => {
                    subject.element.text(`Interval: ${settings.interval}`);
                  }
                })
              ),
              new OptionsListItem(host, "Language", settings.language, {
                onCheck: () => {
                  this._host.rebuildUi();
                }
              })
            ]
          })
        ]
      });
    }
  }
  class ExplainerListItem extends UiComponent {
    /**
     * Construct an element to explain an area of the UI.
     * This is purely for cosmetic/informational value in the UI.
     *
     * @param host - A reference to the host.
     * @param key - The i18n key for the text to appear on the element.
     * @param options - Options for this explainer.
     */
    constructor(host, key, options) {
      super(host);
      __publicField(this, "element");
      const element = $("<li/>", { text: host.engine.i18n(key) }).addClass("ks-explainer");
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
    }
  }
  class LogFiltersSettingsUi extends SettingsSectionUi {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.filter");
      super(host, label, settings);
      __publicField(this, "_filters");
      this.addChild(
        new SettingsList(host, {
          children: [new SettingListItem(host, "All KG log entries.", settings.disableKGLog)],
          hasDisableAll: false,
          hasEnableAll: false
        })
      );
      const buttonTemplates = [
        {
          name: "buildFilter",
          option: this.setting.filters.build,
          label: this._host.engine.i18n("filter.build")
        },
        {
          name: "craftFilter",
          option: this.setting.filters.craft,
          label: this._host.engine.i18n("filter.craft")
        },
        {
          name: "upgradeFilter",
          option: this.setting.filters.upgrade,
          label: this._host.engine.i18n("filter.upgrade")
        },
        {
          name: "researchFilter",
          option: this.setting.filters.research,
          label: this._host.engine.i18n("filter.research")
        },
        {
          name: "tradeFilter",
          option: this.setting.filters.trade,
          label: this._host.engine.i18n("filter.trade")
        },
        {
          name: "huntFilter",
          option: this.setting.filters.hunt,
          label: this._host.engine.i18n("filter.hunt")
        },
        {
          name: "praiseFilter",
          option: this.setting.filters.praise,
          label: this._host.engine.i18n("filter.praise")
        },
        {
          name: "adoreFilter",
          option: this.setting.filters.adore,
          label: this._host.engine.i18n("filter.adore")
        },
        {
          name: "transcendFilter",
          option: this.setting.filters.transcend,
          label: this._host.engine.i18n("filter.transcend")
        },
        {
          name: "faithFilter",
          option: this.setting.filters.faith,
          label: this._host.engine.i18n("filter.faith")
        },
        {
          name: "accelerateFilter",
          option: this.setting.filters.accelerate,
          label: this._host.engine.i18n("filter.accelerate")
        },
        {
          name: "timeSkipFilter",
          option: this.setting.filters.timeSkip,
          label: this._host.engine.i18n("filter.time.skip")
        },
        {
          name: "festivalFilter",
          option: this.setting.filters.festival,
          label: this._host.engine.i18n("filter.festival")
        },
        {
          name: "starFilter",
          option: this.setting.filters.star,
          label: this._host.engine.i18n("filter.star")
        },
        {
          name: "distributeFilter",
          option: this.setting.filters.distribute,
          label: this._host.engine.i18n("filter.distribute")
        },
        {
          name: "promoteFilter",
          option: this.setting.filters.promote,
          label: this._host.engine.i18n("filter.promote")
        },
        {
          name: "miscFilter",
          option: this.setting.filters.misc,
          label: this._host.engine.i18n("filter.misc")
        }
      ];
      const makeButton = (option, label2) => new SettingListItem(this._host, label2, option, {
        onCheck: () => this._host.engine.imessage("filter.enable", [label2]),
        onUnCheck: () => this._host.engine.imessage("filter.disable", [label2])
      });
      this._filters = buttonTemplates.sort((a, b) => a.label.localeCompare(b.label)).map((button) => makeButton(button.option, button.label));
      const listFilters = new SettingsList(this._host);
      listFilters.addChildren(this._filters);
      this.addChild(listFilters);
      this.addChild(new ExplainerListItem(this._host, "filter.explainer"));
    }
  }
  class SettingTriggerListItem extends SettingListItem {
    constructor(host, label, setting, options) {
      super(host, label, setting, options);
      __publicField(this, "triggerButton");
      this.triggerButton = new TriggerButton(host, label, setting, options == null ? void 0 : options.behavior);
      this.element.append(this.triggerButton.element);
    }
    refreshUi() {
      super.refreshUi();
      this.triggerButton.refreshUi();
    }
  }
  class ReligionSettingsUi extends SettingsSectionUi {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.faith");
      super(host, label, settings);
      __publicField(this, "_trigger");
      __publicField(this, "_unicornBuildings");
      __publicField(this, "_bestUnicornBuilding");
      this._trigger = new TriggerButton(host, label, settings);
      this._trigger.element.insertAfter(this._expando.element);
      this.children.add(this._trigger);
      this._unicornBuildings = [
        this._getBuildOption(
          this.setting.buildings.unicornPasture,
          this._host.engine.i18n("$buildings.unicornPasture.label")
        ),
        this._getBuildOption(
          this.setting.buildings.unicornTomb,
          this._host.engine.i18n("$religion.zu.unicornTomb.label")
        ),
        this._getBuildOption(
          this.setting.buildings.ivoryTower,
          this._host.engine.i18n("$religion.zu.ivoryTower.label")
        ),
        this._getBuildOption(
          this.setting.buildings.ivoryCitadel,
          this._host.engine.i18n("$religion.zu.ivoryCitadel.label")
        ),
        this._getBuildOption(
          this.setting.buildings.skyPalace,
          this._host.engine.i18n("$religion.zu.skyPalace.label")
        ),
        this._getBuildOption(
          this.setting.buildings.unicornUtopia,
          this._host.engine.i18n("$religion.zu.unicornUtopia.label")
        ),
        this._getBuildOption(
          this.setting.buildings.sunspire,
          this._host.engine.i18n("$religion.zu.sunspire.label")
        )
      ];
      this._bestUnicornBuilding = new SettingListItem(
        this._host,
        this._host.engine.i18n("option.faith.best.unicorn"),
        this.setting.bestUnicornBuilding,
        {
          delimiter: true,
          onCheck: () => {
            this._host.engine.imessage("status.sub.enable", [
              this._host.engine.i18n("option.faith.best.unicorn")
            ]);
            for (const building of this._unicornBuildings) {
              building.setting.enabled = true;
              building.setting.max = -1;
            }
            this.refreshUi();
          },
          onUnCheck: () => {
            this._host.engine.imessage("status.sub.disable", [
              this._host.engine.i18n("option.faith.best.unicorn")
            ]);
            this.refreshUi();
          },
          upgradeIndicator: true
        }
      );
      const listBuildings = new SettingsList(this._host, {
        children: [
          new HeaderListItem(this._host, this._host.engine.i18n("$religion.panel.ziggurat.label")),
          ...this._unicornBuildings,
          this._bestUnicornBuilding,
          this._getBuildOption(
            this.setting.buildings.marker,
            this._host.engine.i18n("$religion.zu.marker.label")
          ),
          this._getBuildOption(
            this.setting.buildings.unicornGraveyard,
            this._host.engine.i18n("$religion.zu.unicornGraveyard.label")
          ),
          this._getBuildOption(
            this.setting.buildings.unicornNecropolis,
            this._host.engine.i18n("$religion.zu.unicornNecropolis.label")
          ),
          this._getBuildOption(
            this.setting.buildings.blackPyramid,
            this._host.engine.i18n("$religion.zu.blackPyramid.label"),
            true
          ),
          new HeaderListItem(
            this._host,
            this._host.engine.i18n("$religion.panel.orderOfTheSun.label")
          ),
          this._getBuildOption(
            this.setting.buildings.solarchant,
            this._host.engine.i18n("$religion.ru.solarchant.label")
          ),
          this._getBuildOption(
            this.setting.buildings.scholasticism,
            this._host.engine.i18n("$religion.ru.scholasticism.label")
          ),
          this._getBuildOption(
            this.setting.buildings.goldenSpire,
            this._host.engine.i18n("$religion.ru.goldenSpire.label")
          ),
          this._getBuildOption(
            this.setting.buildings.sunAltar,
            this._host.engine.i18n("$religion.ru.sunAltar.label")
          ),
          this._getBuildOption(
            this.setting.buildings.stainedGlass,
            this._host.engine.i18n("$religion.ru.stainedGlass.label")
          ),
          this._getBuildOption(
            this.setting.buildings.solarRevolution,
            this._host.engine.i18n("$religion.ru.solarRevolution.label")
          ),
          this._getBuildOption(
            this.setting.buildings.basilica,
            this._host.engine.i18n("$religion.ru.basilica.label")
          ),
          this._getBuildOption(
            this.setting.buildings.templars,
            this._host.engine.i18n("$religion.ru.templars.label")
          ),
          this._getBuildOption(
            this.setting.buildings.apocripha,
            this._host.engine.i18n("$religion.ru.apocripha.label")
          ),
          this._getBuildOption(
            this.setting.buildings.transcendence,
            this._host.engine.i18n("$religion.ru.transcendence.label"),
            true
          ),
          new HeaderListItem(
            this._host,
            this._host.engine.i18n("$religion.panel.cryptotheology.label")
          ),
          this._getBuildOption(
            this.setting.buildings.blackObelisk,
            this._host.engine.i18n("$religion.tu.blackObelisk.label")
          ),
          this._getBuildOption(
            this.setting.buildings.blackNexus,
            this._host.engine.i18n("$religion.tu.blackNexus.label")
          ),
          this._getBuildOption(
            this.setting.buildings.blackCore,
            this._host.engine.i18n("$religion.tu.blackCore.label")
          ),
          this._getBuildOption(
            this.setting.buildings.singularity,
            this._host.engine.i18n("$religion.tu.singularity.label")
          ),
          this._getBuildOption(
            this.setting.buildings.blackLibrary,
            this._host.engine.i18n("$religion.tu.blackLibrary.label")
          ),
          this._getBuildOption(
            this.setting.buildings.blackRadiance,
            this._host.engine.i18n("$religion.tu.blackRadiance.label")
          ),
          this._getBuildOption(
            this.setting.buildings.blazar,
            this._host.engine.i18n("$religion.tu.blazar.label")
          ),
          this._getBuildOption(
            this.setting.buildings.darkNova,
            this._host.engine.i18n("$religion.tu.darkNova.label")
          ),
          this._getBuildOption(
            this.setting.buildings.holyGenocide,
            this._host.engine.i18n("$religion.tu.holyGenocide.label")
          )
        ],
        onEnableAll: () => this.refreshUi(),
        onDisableAll: () => this.refreshUi(),
        onReset: () => {
          const defaults2 = new ReligionSettings();
          this.setting.load({
            buildings: defaults2.buildings,
            bestUnicornBuilding: defaults2.bestUnicornBuilding
          });
          this.refreshUi();
        }
      });
      this.addChild(listBuildings);
      const listAddition = new SettingsList(this._host, {
        children: [
          new HeaderListItem(this._host, "Additional options"),
          new SettingTriggerListItem(
            this._host,
            this._host.engine.i18n("option.faith.sacrificeUnicorns"),
            this.setting.sacrificeUnicorns,
            {
              behavior: "integer",
              onCheck: () => this._host.engine.imessage("status.sub.enable", [
                this._host.engine.i18n("option.faith.sacrificeUnicorns")
              ]),
              onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
                this._host.engine.i18n("option.faith.sacrificeUnicorns")
              ])
            }
          ),
          new SettingTriggerListItem(
            this._host,
            this._host.engine.i18n("option.faith.sacrificeAlicorns"),
            this.setting.sacrificeAlicorns,
            {
              behavior: "integer",
              onCheck: () => this._host.engine.imessage("status.sub.enable", [
                this._host.engine.i18n("option.faith.sacrificeAlicorns")
              ]),
              onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
                this._host.engine.i18n("option.faith.sacrificeAlicorns")
              ])
            }
          ),
          new SettingTriggerListItem(
            this._host,
            this._host.engine.i18n("option.faith.refineTears"),
            this.setting.refineTears,
            {
              behavior: "integer",
              onCheck: () => this._host.engine.imessage("status.sub.enable", [
                this._host.engine.i18n("option.faith.refineTears")
              ]),
              onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
                this._host.engine.i18n("option.faith.refineTears")
              ])
            }
          ),
          new SettingTriggerListItem(
            this._host,
            this._host.engine.i18n("option.faith.refineTCs"),
            this.setting.refineTimeCrystals,
            {
              behavior: "integer",
              onCheck: () => this._host.engine.imessage("status.sub.enable", [
                this._host.engine.i18n("option.faith.refineTCs")
              ]),
              onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
                this._host.engine.i18n("option.faith.refineTCs")
              ])
            }
          ),
          new SettingListItem(
            this._host,
            this._host.engine.i18n("option.faith.transcend"),
            this.setting.transcend,
            {
              onCheck: () => this._host.engine.imessage("status.sub.enable", [
                this._host.engine.i18n("option.faith.transcend")
              ]),
              onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
                this._host.engine.i18n("option.faith.transcend")
              ])
            }
          ),
          new SettingTriggerListItem(
            this._host,
            this._host.engine.i18n("option.faith.adore"),
            this.setting.adore,
            {
              onCheck: () => this._host.engine.imessage("status.sub.enable", [
                this._host.engine.i18n("option.faith.adore")
              ]),
              onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
                this._host.engine.i18n("option.faith.adore")
              ])
            }
          ),
          new SettingTriggerListItem(
            this._host,
            this._host.engine.i18n("option.praise"),
            this.setting.autoPraise,
            {
              onCheck: () => this._host.engine.imessage("status.sub.enable", [
                this._host.engine.i18n("option.praise")
              ]),
              onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
                this._host.engine.i18n("option.praise")
              ])
            }
          )
        ],
        hasDisableAll: false,
        hasEnableAll: false
      });
      this.addChild(listAddition);
    }
    refreshUi() {
      for (const building of this._unicornBuildings) {
        building.readOnly = this._bestUnicornBuilding.setting.enabled;
        building.maxButton.readOnly = this._bestUnicornBuilding.setting.enabled;
      }
      super.refreshUi();
    }
  }
  class ConsumeButton extends TextButton {
    constructor(host, label, setting, handler = {}) {
      super(host, label, {
        onClick: () => {
          const value = SettingsSectionUi.promptPercentage(
            this._host.engine.i18n("resources.consume.set", [label]),
            SettingsSectionUi.renderPercentage(setting.consume)
          );
          if (value !== null) {
            setting.consume = value;
            this.refreshUi();
          }
          if (handler.onClick) {
            handler.onClick();
          }
        },
        title: setting.consume.toString()
      });
      __publicField(this, "setting");
      this.setting = setting;
    }
    refreshUi() {
      super.refreshUi();
      this.element.prop("title", this.setting.consume.toString());
      this.element.text(
        this._host.engine.i18n("resources.consume", [
          SettingsSectionUi.renderPercentage(this.setting.consume)
        ])
      );
    }
  }
  class StockButton extends TextButton {
    constructor(host, label, setting, handler = {}) {
      super(host, label, {
        onClick: () => {
          const value = SettingsSectionUi.promptLimit(
            this._host.engine.i18n("resources.stock.set", [label]),
            setting.stock.toString()
          );
          if (value !== null) {
            setting.stock = value;
            this.refreshUi();
          }
          if (handler.onClick) {
            handler.onClick();
          }
        },
        title: setting.stock.toString()
      });
      __publicField(this, "setting");
      this.setting = setting;
    }
    refreshUi() {
      super.refreshUi();
      this.element.prop("title", this.setting.stock.toString());
      this.element.text(
        this._host.engine.i18n("resources.stock", [
          SettingsSectionUi.renderLimit(this.setting.stock, this._host)
        ])
      );
    }
  }
  class ResourcesSettingsUi extends SettingsPanel {
    constructor(host, settings, options) {
      const label = host.engine.i18n("ui.resources");
      super(host, label, settings, {
        ...options,
        settingItem: new LabelListItem(host, label, {
          icon: Icons.Resources
        })
      });
      __publicField(this, "_resources");
      const preparedResources = Object.values(
        this.setting.resources
      ).map((resource) => [
        resource,
        ucfirst(this._host.engine.i18n(`$resources.${resource.resource}.title`))
      ]);
      this._resources = [];
      for (const [setting, title2] of preparedResources.sort((a, b) => a[1].localeCompare(b[1]))) {
        this._resources.push(this._makeResourceSetting(title2, setting));
      }
      const listResource = new SettingsList(this._host);
      listResource.addChildren(this._resources);
      this.addChild(listResource);
    }
    /**
     * Creates a UI element that reflects stock and consume values for a given resource.
     * This is currently only used for the craft section.
     *
     * @param title The title to apply to the option.
     * @param setting The option that is being controlled.
     * @returns A new option with stock and consume values.
     */
    _makeResourceSetting(title2, setting) {
      const container = new SettingListItem(this._host, title2, setting, {
        onCheck: () => this._host.engine.imessage("status.resource.enable", [title2]),
        onUnCheck: () => this._host.engine.imessage("status.resource.disable", [title2])
      });
      const stockElement = new StockButton(this._host, title2, setting);
      stockElement.element.addClass("ks-stock-button");
      container.addChild(stockElement);
      const consumeElement = new ConsumeButton(this._host, title2, setting);
      container.addChild(consumeElement);
      return container;
    }
  }
  class PolicySettingsUi extends SettingsPanel {
    constructor(host, settings, options) {
      super(host, host.engine.i18n("ui.upgrade.policies"), settings, options);
      const items2 = [];
      for (const setting of Object.values(this.setting.policies)) {
        const policyLabel = this._host.engine.i18n(
          `$policy.${setting.policy === "authocracy" ? "autocracy" : setting.policy}.label`
        );
        const policyButton = new SettingListItem(this._host, policyLabel, setting, {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [policyLabel]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [policyLabel])
        });
        items2.push({ label: policyLabel, button: policyButton });
      }
      items2.sort((a, b) => a.label.localeCompare(b.label));
      const itemsList = new SettingsList(this._host);
      items2.forEach((button) => itemsList.addChild(button.button));
      this.addChild(itemsList);
    }
  }
  class TechSettingsUi extends SettingsPanel {
    constructor(host, settings, options) {
      super(host, host.engine.i18n("ui.upgrade.techs"), settings, options);
      __publicField(this, "_techs");
      const items2 = [];
      for (const setting of Object.values(this.setting.techs)) {
        const label = this._host.engine.i18n(`$science.${setting.tech}.label`);
        const button = new SettingListItem(this._host, label, setting, {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [label]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [label])
        });
        items2.push({ label, button });
      }
      items2.sort((a, b) => a.label.localeCompare(b.label));
      const itemsList = new SettingsList(this._host);
      items2.forEach((button) => itemsList.addChild(button.button));
      this.addChild(itemsList);
      this._techs = items2.map((button) => button.button);
    }
  }
  class ScienceSettingsUi extends SettingsSectionUi {
    constructor(host, settings) {
      super(host, host.engine.i18n("ui.upgrade"), settings);
      __publicField(this, "_items");
      __publicField(this, "_policiesUi");
      __publicField(this, "_techsUi");
      __publicField(this, "_observeStars");
      this._policiesUi = new PolicySettingsUi(this._host, this.setting.policies);
      this._techsUi = new TechSettingsUi(this._host, this.setting.techs);
      this._observeStars = new SettingListItem(
        this._host,
        this._host.engine.i18n("option.observe"),
        this.setting.observe,
        {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [
            this._host.engine.i18n("option.observe")
          ]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
            this._host.engine.i18n("option.observe")
          ])
        }
      );
      this._items = [this._policiesUi, this._techsUi, this._observeStars];
      const itemsList = new SettingsList(this._host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      itemsList.addChildren([this._techsUi, this._policiesUi, this._observeStars]);
      this.addChild(itemsList);
    }
  }
  class MissionSettingsUi extends SettingsPanel {
    constructor(host, settings, options) {
      super(host, host.engine.i18n("ui.upgrade.missions"), settings, options);
      __publicField(this, "_missions");
      const items2 = [];
      for (const setting of Object.values(this.setting.missions)) {
        const label = this._host.engine.i18n(`$space.${setting.mission}.label`);
        const button = new SettingListItem(this._host, label, setting, {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [label]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [label])
        });
        items2.push({ label, button });
      }
      items2.sort((a, b) => a.label.localeCompare(b.label));
      const itemsList = new SettingsList(this._host);
      items2.forEach((button) => itemsList.addChild(button.button));
      this.addChild(itemsList);
      this._missions = items2.map((button) => button.button);
    }
  }
  class SpaceSettingsUi extends SettingsSectionUi {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.space");
      super(host, label, settings);
      __publicField(this, "_trigger");
      __publicField(this, "_missionsUi");
      this._trigger = new TriggerButton(host, label, settings);
      this._trigger.element.insertAfter(this._expando.element);
      this.children.add(this._trigger);
      const listElements = new SettingsList(this._host, {
        children: [
          new HeaderListItem(this._host, this._host.engine.i18n("$space.planet.cath.label")),
          this._getBuildOption(
            this.setting.buildings.spaceElevator,
            this._host.engine.i18n("$space.planet.cath.spaceElevator.label")
          ),
          this._getBuildOption(
            this.setting.buildings.sattelite,
            this._host.engine.i18n("$space.planet.cath.sattelite.label")
          ),
          this._getBuildOption(
            this.setting.buildings.spaceStation,
            this._host.engine.i18n("$space.planet.cath.spaceStation.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$space.planet.moon.label")),
          this._getBuildOption(
            this.setting.buildings.moonOutpost,
            this._host.engine.i18n("$space.planet.moon.moonOutpost.label")
          ),
          this._getBuildOption(
            this.setting.buildings.moonBase,
            this._host.engine.i18n("$space.planet.moon.moonBase.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$space.planet.dune.label")),
          this._getBuildOption(
            this.setting.buildings.planetCracker,
            this._host.engine.i18n("$space.planet.dune.planetCracker.label")
          ),
          this._getBuildOption(
            this.setting.buildings.hydrofracturer,
            this._host.engine.i18n("$space.planet.dune.hydrofracturer.label")
          ),
          this._getBuildOption(
            this.setting.buildings.spiceRefinery,
            this._host.engine.i18n("$space.planet.dune.spiceRefinery.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$space.planet.piscine.label")),
          this._getBuildOption(
            this.setting.buildings.researchVessel,
            this._host.engine.i18n("$space.planet.piscine.researchVessel.label")
          ),
          this._getBuildOption(
            this.setting.buildings.orbitalArray,
            this._host.engine.i18n("$space.planet.piscine.orbitalArray.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$space.planet.helios.label")),
          this._getBuildOption(
            this.setting.buildings.sunlifter,
            this._host.engine.i18n("$space.planet.helios.sunlifter.label")
          ),
          this._getBuildOption(
            this.setting.buildings.containmentChamber,
            this._host.engine.i18n("$space.planet.helios.containmentChamber.label")
          ),
          this._getBuildOption(
            this.setting.buildings.heatsink,
            this._host.engine.i18n("$space.planet.helios.heatsink.label")
          ),
          this._getBuildOption(
            this.setting.buildings.sunforge,
            this._host.engine.i18n("$space.planet.helios.sunforge.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$space.planet.terminus.label")),
          this._getBuildOption(
            this.setting.buildings.cryostation,
            this._host.engine.i18n("$space.planet.terminus.cryostation.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$space.planet.kairo.label")),
          this._getBuildOption(
            this.setting.buildings.spaceBeacon,
            this._host.engine.i18n("$space.planet.kairo.spaceBeacon.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$space.planet.yarn.label")),
          this._getBuildOption(
            this.setting.buildings.terraformingStation,
            this._host.engine.i18n("$space.planet.yarn.terraformingStation.label")
          ),
          this._getBuildOption(
            this.setting.buildings.hydroponics,
            this._host.engine.i18n("$space.planet.yarn.hydroponics.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$space.planet.umbra.label")),
          this._getBuildOption(
            this.setting.buildings.hrHarvester,
            this._host.engine.i18n("$space.planet.umbra.hrHarvester.label"),
            true
          ),
          new HeaderListItem(this._host, this._host.engine.i18n("$space.planet.charon.label")),
          this._getBuildOption(
            this.setting.buildings.entangler,
            this._host.engine.i18n("$space.planet.charon.entangler.label"),
            true
          ),
          new HeaderListItem(
            this._host,
            this._host.engine.i18n("$space.planet.centaurusSystem.label")
          ),
          this._getBuildOption(
            this.setting.buildings.tectonic,
            this._host.engine.i18n("$space.planet.centaurusSystem.tectonic.label")
          ),
          this._getBuildOption(
            this.setting.buildings.moltenCore,
            this._host.engine.i18n("$space.planet.centaurusSystem.moltenCore.label")
          )
        ],
        onReset: () => {
          this.setting.load({ buildings: new SpaceSettings().buildings });
          this.refreshUi();
        }
      });
      this.addChild(listElements);
      const listAddition = new SettingsList(this._host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      listAddition.addChild(new HeaderListItem(this._host, "Additional options"));
      this._missionsUi = new MissionSettingsUi(this._host, this.setting.unlockMissions);
      listAddition.addChild(this._missionsUi);
      this.addChild(listAddition);
    }
  }
  function toDate(argument) {
    const argStr = Object.prototype.toString.call(argument);
    if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
      return new argument.constructor(+argument);
    } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
      return new Date(argument);
    } else {
      return /* @__PURE__ */ new Date(NaN);
    }
  }
  function compareAsc(dateLeft, dateRight) {
    const _dateLeft = toDate(dateLeft);
    const _dateRight = toDate(dateRight);
    const diff = _dateLeft.getTime() - _dateRight.getTime();
    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1;
    } else {
      return diff;
    }
  }
  const minutesInMonth = 43200;
  const minutesInDay = 1440;
  function differenceInCalendarMonths(dateLeft, dateRight) {
    const _dateLeft = toDate(dateLeft);
    const _dateRight = toDate(dateRight);
    const yearDiff = _dateLeft.getFullYear() - _dateRight.getFullYear();
    const monthDiff = _dateLeft.getMonth() - _dateRight.getMonth();
    return yearDiff * 12 + monthDiff;
  }
  function endOfDay(date) {
    const _date = toDate(date);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }
  function endOfMonth(date) {
    const _date = toDate(date);
    const month = _date.getMonth();
    _date.setFullYear(_date.getFullYear(), month + 1, 0);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }
  function isLastDayOfMonth(date) {
    const _date = toDate(date);
    return +endOfDay(_date) === +endOfMonth(_date);
  }
  function differenceInMonths(dateLeft, dateRight) {
    const _dateLeft = toDate(dateLeft);
    const _dateRight = toDate(dateRight);
    const sign = compareAsc(_dateLeft, _dateRight);
    const difference2 = Math.abs(
      differenceInCalendarMonths(_dateLeft, _dateRight)
    );
    let result;
    if (difference2 < 1) {
      result = 0;
    } else {
      if (_dateLeft.getMonth() === 1 && _dateLeft.getDate() > 27) {
        _dateLeft.setDate(30);
      }
      _dateLeft.setMonth(_dateLeft.getMonth() - sign * difference2);
      let isLastMonthNotFull = compareAsc(_dateLeft, _dateRight) === -sign;
      if (isLastDayOfMonth(toDate(dateLeft)) && difference2 === 1 && compareAsc(dateLeft, _dateRight) === 1) {
        isLastMonthNotFull = false;
      }
      result = sign * (difference2 - Number(isLastMonthNotFull));
    }
    return result === 0 ? 0 : result;
  }
  function differenceInMilliseconds(dateLeft, dateRight) {
    return toDate(dateLeft).getTime() - toDate(dateRight).getTime();
  }
  function getRoundingMethod(method) {
    return method ? Math[method] : Math.trunc;
  }
  function differenceInSeconds(dateLeft, dateRight, options) {
    const diff = differenceInMilliseconds(dateLeft, dateRight) / 1e3;
    return getRoundingMethod(options == null ? void 0 : options.roundingMethod)(diff);
  }
  const formatDistanceLocale = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  };
  const formatDistance$1 = (token, count, options) => {
    let result;
    const tokenValue = formatDistanceLocale[token];
    if (typeof tokenValue === "string") {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else {
      result = tokenValue.other.replace("{{count}}", count.toString());
    }
    if (options == null ? void 0 : options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "in " + result;
      } else {
        return result + " ago";
      }
    }
    return result;
  };
  function buildFormatLongFn(args) {
    return (options = {}) => {
      const width = options.width ? String(options.width) : args.defaultWidth;
      const format2 = args.formats[width] || args.formats[args.defaultWidth];
      return format2;
    };
  }
  const dateFormats = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  };
  const timeFormats = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  };
  const dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  };
  const formatLong = {
    date: buildFormatLongFn({
      formats: dateFormats,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats,
      defaultWidth: "full"
    })
  };
  const formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  };
  const formatRelative = (token, _date, _baseDate, _options2) => formatRelativeLocale[token];
  function buildLocalizeFn(args) {
    return (value, options) => {
      const context = (options == null ? void 0 : options.context) ? String(options.context) : "standalone";
      let valuesArray;
      if (context === "formatting" && args.formattingValues) {
        const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        const width = (options == null ? void 0 : options.width) ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        const defaultWidth = args.defaultWidth;
        const width = (options == null ? void 0 : options.width) ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[width] || args.values[defaultWidth];
      }
      const index = args.argumentCallback ? args.argumentCallback(value) : value;
      return valuesArray[index];
    };
  }
  const eraValues = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  };
  const quarterValues = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  };
  const monthValues = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  };
  const dayValues = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  };
  const dayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  };
  const formattingDayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  };
  const ordinalNumber = (dirtyNumber, _options2) => {
    const number = Number(dirtyNumber);
    const rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + "st";
        case 2:
          return number + "nd";
        case 3:
          return number + "rd";
      }
    }
    return number + "th";
  };
  const localize = {
    ordinalNumber,
    era: buildLocalizeFn({
      values: eraValues,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues,
      defaultWidth: "wide",
      argumentCallback: (quarter) => quarter - 1
    }),
    month: buildLocalizeFn({
      values: monthValues,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: "wide"
    })
  };
  function buildMatchFn(args) {
    return (string, options = {}) => {
      const width = options.width;
      const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      const matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      const matchedString = matchResult[0];
      const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern2) => pattern2.test(matchedString)) : (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        findKey(parsePatterns, (pattern2) => pattern2.test(matchedString))
      );
      let value;
      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        options.valueCallback(value)
      ) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }
  function findKey(object, predicate) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
        return key;
      }
    }
    return void 0;
  }
  function findIndex(array, predicate) {
    for (let key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return void 0;
  }
  function buildMatchPatternFn(args) {
    return (string, options = {}) => {
      const matchResult = string.match(args.matchPattern);
      if (!matchResult)
        return null;
      const matchedString = matchResult[0];
      const parseResult = string.match(args.parsePattern);
      if (!parseResult)
        return null;
      let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }
  const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  const parseOrdinalNumberPattern = /\d+/i;
  const matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  const parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  };
  const matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  const parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  const matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  const parseMonthPatterns = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ]
  };
  const matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  const parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  const matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  const parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  const match = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: (value) => parseInt(value, 10)
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: "any",
      valueCallback: (index) => index + 1
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: "any"
    })
  };
  const enUS = {
    code: "en-US",
    formatDistance: formatDistance$1,
    formatLong,
    formatRelative,
    localize,
    match,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  let defaultOptions = {};
  function getDefaultOptions() {
    return defaultOptions;
  }
  function getTimezoneOffsetInMilliseconds(date) {
    const utcDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      )
    );
    utcDate.setUTCFullYear(date.getFullYear());
    return date.getTime() - utcDate.getTime();
  }
  function formatDistance(date, baseDate, options) {
    const defaultOptions2 = getDefaultOptions();
    const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
    const minutesInAlmostTwoDays = 2520;
    const comparison = compareAsc(date, baseDate);
    if (isNaN(comparison)) {
      throw new RangeError("Invalid time value");
    }
    const localizeOptions = Object.assign({}, options, {
      addSuffix: options == null ? void 0 : options.addSuffix,
      comparison
    });
    let dateLeft;
    let dateRight;
    if (comparison > 0) {
      dateLeft = toDate(baseDate);
      dateRight = toDate(date);
    } else {
      dateLeft = toDate(date);
      dateRight = toDate(baseDate);
    }
    const seconds = differenceInSeconds(dateRight, dateLeft);
    const offsetInSeconds = (getTimezoneOffsetInMilliseconds(dateRight) - getTimezoneOffsetInMilliseconds(dateLeft)) / 1e3;
    const minutes = Math.round((seconds - offsetInSeconds) / 60);
    let months;
    if (minutes < 2) {
      if (options == null ? void 0 : options.includeSeconds) {
        if (seconds < 5) {
          return locale.formatDistance("lessThanXSeconds", 5, localizeOptions);
        } else if (seconds < 10) {
          return locale.formatDistance("lessThanXSeconds", 10, localizeOptions);
        } else if (seconds < 20) {
          return locale.formatDistance("lessThanXSeconds", 20, localizeOptions);
        } else if (seconds < 40) {
          return locale.formatDistance("halfAMinute", 0, localizeOptions);
        } else if (seconds < 60) {
          return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
        } else {
          return locale.formatDistance("xMinutes", 1, localizeOptions);
        }
      } else {
        if (minutes === 0) {
          return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
        } else {
          return locale.formatDistance("xMinutes", minutes, localizeOptions);
        }
      }
    } else if (minutes < 45) {
      return locale.formatDistance("xMinutes", minutes, localizeOptions);
    } else if (minutes < 90) {
      return locale.formatDistance("aboutXHours", 1, localizeOptions);
    } else if (minutes < minutesInDay) {
      const hours = Math.round(minutes / 60);
      return locale.formatDistance("aboutXHours", hours, localizeOptions);
    } else if (minutes < minutesInAlmostTwoDays) {
      return locale.formatDistance("xDays", 1, localizeOptions);
    } else if (minutes < minutesInMonth) {
      const days = Math.round(minutes / minutesInDay);
      return locale.formatDistance("xDays", days, localizeOptions);
    } else if (minutes < minutesInMonth * 2) {
      months = Math.round(minutes / minutesInMonth);
      return locale.formatDistance("aboutXMonths", months, localizeOptions);
    }
    months = differenceInMonths(dateRight, dateLeft);
    if (months < 12) {
      const nearestMonth = Math.round(minutes / minutesInMonth);
      return locale.formatDistance("xMonths", nearestMonth, localizeOptions);
    } else {
      const monthsSinceStartOfYear = months % 12;
      const years = Math.floor(months / 12);
      if (monthsSinceStartOfYear < 3) {
        return locale.formatDistance("aboutXYears", years, localizeOptions);
      } else if (monthsSinceStartOfYear < 9) {
        return locale.formatDistance("overXYears", years, localizeOptions);
      } else {
        return locale.formatDistance("almostXYears", years + 1, localizeOptions);
      }
    }
  }
  function formatDistanceToNow(date, options) {
    return formatDistance(date, Date.now(), options);
  }
  class SavegameLoader {
    constructor(game2) {
      __publicField(this, "_game");
      this._game = game2;
    }
    /**
     * Conveniently wraps the savegame loading process in an async construct.
     *
     * @param data The savegame data to load. We accept `null` here for convenience
     * when dealing with `import`ed save game data.
     * @returns Nothing
     */
    load(data) {
      return new Promise((resolve2, reject) => {
        if (data === null) {
          resolve2();
          return;
        }
        this._game.saveImportDropboxText(data, (error2) => {
          if (error2) {
            reject(error2);
            return;
          }
          resolve2();
        });
      });
    }
  }
  class CopyButton extends IconButton {
    /**
     * Constructs a `CopyButton`.
     *
     * @param host A reference to the host.
     * @param title The `title` of the button.
     */
    constructor(host, title2 = "Copy to clipboard") {
      super(host, Icons.Copy, title2);
    }
  }
  class DeleteButton extends IconButton {
    /**
     * Constructs a `DeleteButton`.
     *
     * @param host A reference to the host.
     * @param title The `title` of the button.
     */
    constructor(host, title2 = "Delete") {
      super(host, Icons.Delete, title2);
    }
  }
  class UpdateButton extends IconButton {
    /**
     * Constructs a `UpdateButton`.
     *
     * @param host A reference to the host.
     * @param title The `title` of the button.
     */
    constructor(host, title2 = "Update") {
      super(host, Icons.Sync, title2);
    }
  }
  class StateManagementUi extends SettingsPanel {
    constructor(host, settings) {
      const label = host.engine.i18n("state.title");
      super(host, label, settings, {
        settingItem: new LabelListItem(host, label, { icon: Icons.State })
      });
      __publicField(this, "states", new Array());
      __publicField(this, "stateList");
      this.stateList = new SettingsList(host, {
        hasEnableAll: false,
        hasDisableAll: false
      });
      this.addChild(
        new SettingsList(host, {
          children: [
            new SettingListItem(
              host,
              this._host.engine.i18n("state.noConfirm"),
              this.setting.noConfirm,
              { delimiter: true }
            ),
            new HeaderListItem(host, this._host.engine.i18n("state.copy")),
            new ButtonListItem(
              host,
              new TextButton(host, this._host.engine.i18n("state.ksOnly"), {
                onClick: () => void this.copySettings().catch(console.error),
                title: this._host.engine.i18n("state.ksOnlyTitleCopy")
              })
            ),
            new ButtonListItem(
              host,
              new TextButton(host, this._host.engine.i18n("state.kgSave"), {
                onClick: () => void this.copySaveGame().catch(console.error),
                title: this._host.engine.i18n("state.kgSaveTitleCopy")
              }),
              { delimiter: true }
            ),
            new SettingListItem(host, "Compress data", this.setting.compress, { delimiter: true }),
            new HeaderListItem(host, this._host.engine.i18n("state.load")),
            new ButtonListItem(
              host,
              new TextButton(host, this._host.engine.i18n("state.ksOnly"), {
                onClick: () => this.loadSettings(),
                title: this._host.engine.i18n("state.ksOnlyTitleLoad")
              })
            ),
            new ButtonListItem(
              host,
              new TextButton(host, this._host.engine.i18n("state.kgSave"), {
                onClick: () => {
                  var _a;
                  return void ((_a = this.loadSaveGame()) == null ? void 0 : _a.catch(console.error));
                },
                title: this._host.engine.i18n("state.kgSaveTitleLoad")
              }),
              { delimiter: true }
            ),
            new HeaderListItem(host, this._host.engine.i18n("state.local")),
            new ButtonListItem(
              host,
              new TextButton(host, this._host.engine.i18n("state.storeCurrent"), {
                onClick: () => this.storeState(),
                title: this._host.engine.i18n("state.storeCurrentTitle")
              })
            ),
            new ButtonListItem(
              host,
              new TextButton(host, this._host.engine.i18n("state.import"), {
                onClick: () => this.importState(),
                title: this._host.engine.i18n("state.importTitle")
              }),
              { delimiter: true }
            ),
            new ButtonListItem(
              host,
              new TextButton(host, this._host.engine.i18n("state.reset"), {
                onClick: () => this.resetState(),
                title: this._host.engine.i18n("state.resetTitle")
              }),
              { delimiter: true }
            ),
            new HeaderListItem(host, this._host.engine.i18n("state.loadStored")),
            this.stateList
          ],
          hasDisableAll: false,
          hasEnableAll: false
        })
      );
      this._loadStates();
    }
    _loadStates() {
      let stateIndex = 0;
      let state = localStorage.getItem(`ks.state.${stateIndex}`);
      this.states.splice(0);
      try {
        while (!isNil(state)) {
          const stateObject = JSON.parse(state);
          UserScript.unknownAsEngineStateOrThrow(stateObject.state);
          this.states.push(stateObject);
          state = localStorage.getItem(`ks.state.${++stateIndex}`);
        }
      } catch (error2) {
        cerror(error2);
      }
    }
    _storeStates() {
      let stateIndex = 0;
      let state = localStorage.getItem(`ks.state.${stateIndex}`);
      while (!isNil(state)) {
        localStorage.removeItem(`ks.state.${stateIndex}`);
        state = localStorage.getItem(`ks.state.${++stateIndex}`);
      }
      stateIndex = 0;
      for (const state2 of this.states) {
        localStorage.setItem(`ks.state.${stateIndex++}`, JSON.stringify(state2));
      }
    }
    refreshUi() {
      super.refreshUi();
      this.stateList.removeChildren(this.stateList.children);
      const unlabeled = this._host.engine.i18n("state.unlabled");
      for (const state of this.states) {
        const button = new TextButton(
          this._host,
          `${state.label ?? unlabeled} (${formatDistanceToNow(new Date(state.timestamp), {
            addSuffix: true
          })})`,
          { onClick: () => this.loadState(state.state), title: state.timestamp }
        );
        const listItem = new ButtonListItem(this._host, button);
        const deleteButton = new DeleteButton(this._host);
        deleteButton.element.on("click", () => this.deleteState(state));
        listItem.addChild(deleteButton);
        const copyButton = new CopyButton(this._host);
        copyButton.element.on(
          "click",
          () => void this.copySettings(state.state).catch(console.error)
        );
        listItem.addChild(copyButton);
        const updateButton = new UpdateButton(this._host);
        updateButton.element.on(
          "click",
          () => void this.updateState(state, this._host.engine.stateSerialize())
        );
        listItem.addChild(updateButton);
        this.stateList.addChild(listItem);
      }
    }
    async copySettings(state) {
      return this._host.copySettings(state, this.setting.compress.enabled);
    }
    async copySaveGame() {
      const saveData = this._host.game.save();
      const saveDataString = JSON.stringify(saveData);
      const encodedData = this.setting.compress.enabled ? this._host.game.compressLZData(saveDataString) : saveDataString;
      await window.navigator.clipboard.writeText(encodedData);
      this._host.engine.imessage("savegame.copied");
    }
    loadSettings() {
      const input = window.prompt(this._host.engine.i18n("state.loadPrompt"));
      if (isNil(input)) {
        return;
      }
      if (!this.setting.noConfirm.enabled && !window.confirm(this._host.engine.i18n("state.confirmDestruction"))) {
        return;
      }
      this._host.importSettingsFromString(input);
      this._host.engine.imessage("settings.loaded");
    }
    async loadSaveGame() {
      const input = window.prompt(this._host.engine.i18n("state.loadPromptGame"));
      if (isNil(input)) {
        return;
      }
      if (!this.setting.noConfirm.enabled && !window.confirm(this._host.engine.i18n("state.confirmDestruction"))) {
        return;
      }
      let subjectData = input;
      try {
        JSON.parse(input);
        const compressed = this._host.game.compressLZData(input);
        subjectData = compressed;
      } catch (error2) {
      }
      await new SavegameLoader(this._host.game).load(subjectData);
      this._host.engine.imessage("savegame.loaded");
    }
    resetState() {
      if (!this.setting.noConfirm.enabled && !window.confirm(this._host.engine.i18n("state.confirmDestruction"))) {
        return;
      }
      this._host.engine.stateReset();
      this._host.refreshUi();
    }
    storeState(state) {
      let label = window.prompt("Label for this state") ?? void 0;
      label = label === "" ? void 0 : label;
      if (!isNil(label)) {
        label = label.substring(0, 127);
      }
      this.states.push({
        label,
        state: state ?? this._host.engine.stateSerialize(),
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      this._storeStates();
      this.refreshUi();
    }
    importState() {
      const input = window.prompt(this._host.engine.i18n("state.paste"));
      if (isNil(input)) {
        return;
      }
      const state = UserScript.decodeSettings(input);
      this.storeState(state);
    }
    loadState(state) {
      if (!this.setting.noConfirm.enabled && !window.confirm(this._host.engine.i18n("state.confirmDestruction"))) {
        return;
      }
      this._host.engine.stateLoad(state, true);
      this._host.refreshUi();
      this._host.engine.imessage("state.loaded");
    }
    updateState(state, newState) {
      if (!this.setting.noConfirm.enabled && !window.confirm(this._host.engine.i18n("state.confirmDestruction"))) {
        return;
      }
      const index = this.states.indexOf(state);
      if (index < 0) {
        return;
      }
      this.states[index] = {
        label: state.label,
        state: newState,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      this._storeStates();
      this.refreshUi();
      this._host.engine.imessage("state.updated");
    }
    deleteState(state) {
      if (!this.setting.noConfirm.enabled && !window.confirm(this._host.engine.i18n("state.confirmDestruction"))) {
        return;
      }
      const index = this.states.indexOf(state);
      if (index < 0) {
        return;
      }
      this.states.splice(index, 1);
      this._storeStates();
      this.refreshUi();
      this._host.engine.imessage("state.deleted");
    }
  }
  class IconSettingsPanel extends CollapsiblePanel {
    /**
     * Constructs a settings panel that can have an icon.
     *
     * @param host A reference to the host.
     * @param label The label to put main checkbox of this section.
     * @param setting An setting for which this is the settings panel.
     * @param options Options for the panel.
     */
    constructor(host, label, setting, options) {
      super(host, new LabelListItem(host, label, { icon: options == null ? void 0 : options.icon }), {
        initiallyExpanded: options == null ? void 0 : options.initiallyExpanded
      });
      __publicField(this, "setting");
      this.setting = setting;
    }
  }
  class TriggerLimitButton extends TextButton {
    constructor(host, label, setting, handler = {}) {
      super(host, label, {
        onClick: () => {
          const value = SettingsSectionUi.promptLimit(
            host.engine.i18n("ui.trigger.setinteger", [label]),
            setting.trigger.toString()
          );
          if (value !== null) {
            setting.trigger = value;
            this.refreshUi();
          }
          if (handler.onClick) {
            handler.onClick();
          }
        },
        title: setting.trigger.toFixed()
      });
      __publicField(this, "behavior", "percentage");
      __publicField(this, "setting");
      this.element.addClass("ks-max-button");
      this.setting = setting;
    }
    refreshUi() {
      super.refreshUi();
      this.element.prop("title", this.setting.trigger.toFixed());
      this.element.text(
        this._host.engine.i18n("ui.trigger", [
          SettingsSectionUi.renderLimit(this.setting.trigger, this._host)
        ])
      );
    }
  }
  class SettingTriggerLimitListItem extends SettingListItem {
    constructor(host, label, setting, options) {
      super(host, label, setting, options);
      __publicField(this, "triggerButton");
      this.triggerButton = new TriggerLimitButton(host, label, setting);
      this.element.append(this.triggerButton.element);
    }
    refreshUi() {
      super.refreshUi();
      this.triggerButton.refreshUi();
    }
  }
  class ResetBonfireSettingsUi extends IconSettingsPanel {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.build");
      super(host, label, settings, {
        icon: Icons.Bonfire
      });
      __publicField(this, "_buildings");
      this._buildings = [
        this._getResetOption(
          this.setting.buildings.hut,
          this._host.engine.i18n("$buildings.hut.label")
        ),
        this._getResetOption(
          this.setting.buildings.logHouse,
          this._host.engine.i18n("$buildings.logHouse.label")
        ),
        this._getResetOption(
          this.setting.buildings.mansion,
          this._host.engine.i18n("$buildings.mansion.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.workshop,
          this._host.engine.i18n("$buildings.workshop.label")
        ),
        this._getResetOption(
          this.setting.buildings.factory,
          this._host.engine.i18n("$buildings.factory.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.field,
          this._host.engine.i18n("$buildings.field.label")
        ),
        this._getResetOption(
          this.setting.buildings.pasture,
          this._host.engine.i18n("$buildings.pasture.label")
        ),
        this._getResetOption(
          this.setting.buildings.solarfarm,
          this._host.engine.i18n("$buildings.solarfarm.label")
        ),
        this._getResetOption(
          this.setting.buildings.mine,
          this._host.engine.i18n("$buildings.mine.label")
        ),
        this._getResetOption(
          this.setting.buildings.lumberMill,
          this._host.engine.i18n("$buildings.lumberMill.label")
        ),
        this._getResetOption(
          this.setting.buildings.aqueduct,
          this._host.engine.i18n("$buildings.aqueduct.label")
        ),
        this._getResetOption(
          this.setting.buildings.hydroplant,
          this._host.engine.i18n("$buildings.hydroplant.label")
        ),
        this._getResetOption(
          this.setting.buildings.oilWell,
          this._host.engine.i18n("$buildings.oilWell.label")
        ),
        this._getResetOption(
          this.setting.buildings.quarry,
          this._host.engine.i18n("$buildings.quarry.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.smelter,
          this._host.engine.i18n("$buildings.smelter.label")
        ),
        this._getResetOption(
          this.setting.buildings.biolab,
          this._host.engine.i18n("$buildings.biolab.label")
        ),
        this._getResetOption(
          this.setting.buildings.calciner,
          this._host.engine.i18n("$buildings.calciner.label")
        ),
        this._getResetOption(
          this.setting.buildings.reactor,
          this._host.engine.i18n("$buildings.reactor.label")
        ),
        this._getResetOption(
          this.setting.buildings.accelerator,
          this._host.engine.i18n("$buildings.accelerator.label")
        ),
        this._getResetOption(
          this.setting.buildings.steamworks,
          this._host.engine.i18n("$buildings.steamworks.label")
        ),
        this._getResetOption(
          this.setting.buildings.magneto,
          this._host.engine.i18n("$buildings.magneto.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.library,
          this._host.engine.i18n("$buildings.library.label")
        ),
        this._getResetOption(
          this.setting.buildings.dataCenter,
          this._host.engine.i18n("$buildings.dataCenter.label")
        ),
        this._getResetOption(
          this.setting.buildings.academy,
          this._host.engine.i18n("$buildings.academy.label")
        ),
        this._getResetOption(
          this.setting.buildings.observatory,
          this._host.engine.i18n("$buildings.observatory.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.amphitheatre,
          this._host.engine.i18n("$buildings.amphitheatre.label")
        ),
        this._getResetOption(
          this.setting.buildings.broadcasttower,
          this._host.engine.i18n("$buildings.broadcasttower.label")
        ),
        this._getResetOption(
          this.setting.buildings.tradepost,
          this._host.engine.i18n("$buildings.tradepost.label")
        ),
        this._getResetOption(
          this.setting.buildings.chapel,
          this._host.engine.i18n("$buildings.chapel.label")
        ),
        this._getResetOption(
          this.setting.buildings.temple,
          this._host.engine.i18n("$buildings.temple.label")
        ),
        this._getResetOption(
          this.setting.buildings.mint,
          this._host.engine.i18n("$buildings.mint.label")
        ),
        this._getResetOption(
          this.setting.buildings.ziggurat,
          this._host.engine.i18n("$buildings.ziggurat.label")
        ),
        this._getResetOption(
          this.setting.buildings.chronosphere,
          this._host.engine.i18n("$buildings.chronosphere.label")
        ),
        this._getResetOption(
          this.setting.buildings.aiCore,
          this._host.engine.i18n("$buildings.aicore.label")
        ),
        this._getResetOption(
          this.setting.buildings.brewery,
          this._host.engine.i18n("$buildings.brewery.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.barn,
          this._host.engine.i18n("$buildings.barn.label")
        ),
        this._getResetOption(
          this.setting.buildings.harbor,
          this._host.engine.i18n("$buildings.harbor.label")
        ),
        this._getResetOption(
          this.setting.buildings.warehouse,
          this._host.engine.i18n("$buildings.warehouse.label")
        ),
        this._getResetOption(
          this.setting.buildings.spaceport,
          this._host.engine.i18n("$buildings.spaceport.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.zebraOutpost,
          this._host.engine.i18n("$buildings.zebraOutpost.label")
        ),
        this._getResetOption(
          this.setting.buildings.zebraWorkshop,
          this._host.engine.i18n("$buildings.zebraWorkshop.label")
        ),
        this._getResetOption(
          this.setting.buildings.zebraForge,
          this._host.engine.i18n("$buildings.zebraForge.label")
        )
      ];
      const listBuildings = new SettingsList(this._host);
      listBuildings.addChildren(this._buildings);
      this.addChild(listBuildings);
    }
    _getResetOption(option, i18nName, delimiter = false, upgradeIndicator = false) {
      return new SettingTriggerLimitListItem(this._host, i18nName, option, {
        delimiter,
        onCheck: () => this._host.engine.imessage("status.reset.check.enable", [i18nName]),
        onUnCheck: () => this._host.engine.imessage("status.reset.check.disable", [i18nName]),
        upgradeIndicator
      });
    }
  }
  class ResetReligionSettingsUi extends IconSettingsPanel {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.faith");
      super(host, label, settings, {
        icon: Icons.Religion
      });
      __publicField(this, "_buildings");
      this._buildings = [
        this._getResetOption(
          this.setting.buildings.unicornPasture,
          this._host.engine.i18n("$buildings.unicornPasture.label")
        ),
        this._getResetOption(
          this.setting.buildings.unicornTomb,
          this._host.engine.i18n("$religion.zu.unicornTomb.label")
        ),
        this._getResetOption(
          this.setting.buildings.ivoryTower,
          this._host.engine.i18n("$religion.zu.ivoryTower.label")
        ),
        this._getResetOption(
          this.setting.buildings.ivoryCitadel,
          this._host.engine.i18n("$religion.zu.ivoryCitadel.label")
        ),
        this._getResetOption(
          this.setting.buildings.skyPalace,
          this._host.engine.i18n("$religion.zu.skyPalace.label")
        ),
        this._getResetOption(
          this.setting.buildings.unicornUtopia,
          this._host.engine.i18n("$religion.zu.unicornUtopia.label")
        ),
        this._getResetOption(
          this.setting.buildings.sunspire,
          this._host.engine.i18n("$religion.zu.sunspire.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.marker,
          this._host.engine.i18n("$religion.zu.marker.label")
        ),
        this._getResetOption(
          this.setting.buildings.unicornGraveyard,
          this._host.engine.i18n("$religion.zu.unicornGraveyard.label")
        ),
        this._getResetOption(
          this.setting.buildings.unicornNecropolis,
          this._host.engine.i18n("$religion.zu.unicornNecropolis.label")
        ),
        this._getResetOption(
          this.setting.buildings.blackPyramid,
          this._host.engine.i18n("$religion.zu.blackPyramid.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.solarchant,
          this._host.engine.i18n("$religion.ru.solarchant.label")
        ),
        this._getResetOption(
          this.setting.buildings.scholasticism,
          this._host.engine.i18n("$religion.ru.scholasticism.label")
        ),
        this._getResetOption(
          this.setting.buildings.goldenSpire,
          this._host.engine.i18n("$religion.ru.goldenSpire.label")
        ),
        this._getResetOption(
          this.setting.buildings.sunAltar,
          this._host.engine.i18n("$religion.ru.sunAltar.label")
        ),
        this._getResetOption(
          this.setting.buildings.stainedGlass,
          this._host.engine.i18n("$religion.ru.stainedGlass.label")
        ),
        this._getResetOption(
          this.setting.buildings.solarRevolution,
          this._host.engine.i18n("$religion.ru.solarRevolution.label")
        ),
        this._getResetOption(
          this.setting.buildings.basilica,
          this._host.engine.i18n("$religion.ru.basilica.label")
        ),
        this._getResetOption(
          this.setting.buildings.templars,
          this._host.engine.i18n("$religion.ru.templars.label")
        ),
        this._getResetOption(
          this.setting.buildings.apocripha,
          this._host.engine.i18n("$religion.ru.apocripha.label")
        ),
        this._getResetOption(
          this.setting.buildings.transcendence,
          this._host.engine.i18n("$religion.ru.transcendence.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.blackObelisk,
          this._host.engine.i18n("$religion.tu.blackObelisk.label")
        ),
        this._getResetOption(
          this.setting.buildings.blackNexus,
          this._host.engine.i18n("$religion.tu.blackNexus.label")
        ),
        this._getResetOption(
          this.setting.buildings.blackCore,
          this._host.engine.i18n("$religion.tu.blackCore.label")
        ),
        this._getResetOption(
          this.setting.buildings.singularity,
          this._host.engine.i18n("$religion.tu.singularity.label")
        ),
        this._getResetOption(
          this.setting.buildings.blackLibrary,
          this._host.engine.i18n("$religion.tu.blackLibrary.label")
        ),
        this._getResetOption(
          this.setting.buildings.blackRadiance,
          this._host.engine.i18n("$religion.tu.blackRadiance.label")
        ),
        this._getResetOption(
          this.setting.buildings.blazar,
          this._host.engine.i18n("$religion.tu.blazar.label")
        ),
        this._getResetOption(
          this.setting.buildings.darkNova,
          this._host.engine.i18n("$religion.tu.darkNova.label")
        ),
        this._getResetOption(
          this.setting.buildings.holyGenocide,
          this._host.engine.i18n("$religion.tu.holyGenocide.label")
        )
      ];
      const listBuildings = new SettingsList(this._host);
      listBuildings.addChildren(this._buildings);
      this.addChild(listBuildings);
    }
    _getResetOption(option, i18nName, delimiter = false, upgradeIndicator = false) {
      return new SettingTriggerLimitListItem(this._host, i18nName, option, {
        delimiter,
        onCheck: () => this._host.engine.imessage("status.reset.check.enable", [i18nName]),
        onUnCheck: () => this._host.engine.imessage("status.reset.check.disable", [i18nName]),
        upgradeIndicator
      });
    }
  }
  class ResetResourcesSettingsUi extends IconSettingsPanel {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.resources");
      super(host, label, settings, {
        icon: Icons.Resources
      });
      __publicField(this, "_resources");
      this._resources = [];
      for (const setting of Object.values(this.setting.resources)) {
        this._resources.push(
          this._addNewResourceOption(
            ucfirst(this._host.engine.i18n(`$resources.${setting.resource}.title`)),
            setting
          )
        );
      }
      const listResources = new SettingsList(this._host);
      listResources.addChildren(this._resources);
      this.addChild(listResources);
    }
    /**
     * Creates a UI element that reflects stock values for a given resource.
     * This is currently only used for the time/reset section.
     *
     * @param title The title to apply to the option.
     * @param setting The option that is being controlled.
     * @returns A new option with stock value.
     */
    _addNewResourceOption(title2, setting) {
      const container = new SettingListItem(this._host, title2, setting, {
        onCheck: () => this._host.engine.imessage("status.sub.enable", [title2]),
        onUnCheck: () => this._host.engine.imessage("status.sub.disable", [title2])
      });
      const stockElement = new StockButton(this._host, title2, setting);
      container.addChild(stockElement);
      return container;
    }
  }
  class ResetSpaceSettingsUi extends IconSettingsPanel {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.space");
      super(host, label, settings, {
        icon: Icons.Space
      });
      __publicField(this, "_buildings");
      this._buildings = [
        this._getResetOption(
          this.setting.buildings.spaceElevator,
          this._host.engine.i18n("$space.planet.cath.spaceElevator.label")
        ),
        this._getResetOption(
          this.setting.buildings.sattelite,
          this._host.engine.i18n("$space.planet.cath.sattelite.label")
        ),
        this._getResetOption(
          this.setting.buildings.spaceStation,
          this._host.engine.i18n("$space.planet.cath.spaceStation.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.moonOutpost,
          this._host.engine.i18n("$space.planet.moon.moonOutpost.label")
        ),
        this._getResetOption(
          this.setting.buildings.moonBase,
          this._host.engine.i18n("$space.planet.moon.moonBase.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.planetCracker,
          this._host.engine.i18n("$space.planet.dune.planetCracker.label")
        ),
        this._getResetOption(
          this.setting.buildings.hydrofracturer,
          this._host.engine.i18n("$space.planet.dune.hydrofracturer.label")
        ),
        this._getResetOption(
          this.setting.buildings.spiceRefinery,
          this._host.engine.i18n("$space.planet.dune.spiceRefinery.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.researchVessel,
          this._host.engine.i18n("$space.planet.piscine.researchVessel.label")
        ),
        this._getResetOption(
          this.setting.buildings.orbitalArray,
          this._host.engine.i18n("$space.planet.piscine.orbitalArray.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.sunlifter,
          this._host.engine.i18n("$space.planet.helios.sunlifter.label")
        ),
        this._getResetOption(
          this.setting.buildings.containmentChamber,
          this._host.engine.i18n("$space.planet.helios.containmentChamber.label")
        ),
        this._getResetOption(
          this.setting.buildings.heatsink,
          this._host.engine.i18n("$space.planet.helios.heatsink.label")
        ),
        this._getResetOption(
          this.setting.buildings.sunforge,
          this._host.engine.i18n("$space.planet.helios.sunforge.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.cryostation,
          this._host.engine.i18n("$space.planet.terminus.cryostation.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.spaceBeacon,
          this._host.engine.i18n("$space.planet.kairo.spaceBeacon.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.terraformingStation,
          this._host.engine.i18n("$space.planet.yarn.terraformingStation.label")
        ),
        this._getResetOption(
          this.setting.buildings.hydroponics,
          this._host.engine.i18n("$space.planet.yarn.hydroponics.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.hrHarvester,
          this._host.engine.i18n("$space.planet.umbra.hrHarvester.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.entangler,
          this._host.engine.i18n("$space.planet.charon.entangler.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.tectonic,
          this._host.engine.i18n("$space.planet.centaurusSystem.tectonic.label")
        ),
        this._getResetOption(
          this.setting.buildings.moltenCore,
          this._host.engine.i18n("$space.planet.centaurusSystem.moltenCore.label")
        )
      ];
      const listBuildings = new SettingsList(this._host);
      listBuildings.addChildren(this._buildings);
      this.addChild(listBuildings);
    }
    _getResetOption(option, i18nName, delimiter = false, upgradeIndicator = false) {
      return new SettingTriggerLimitListItem(this._host, i18nName, option, {
        delimiter,
        onCheck: () => this._host.engine.imessage("status.reset.check.enable", [i18nName]),
        onUnCheck: () => this._host.engine.imessage("status.reset.check.disable", [i18nName]),
        upgradeIndicator
      });
    }
  }
  class ResetTimeSettingsUi extends IconSettingsPanel {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.time");
      super(host, label, settings, {
        icon: Icons.Time
      });
      __publicField(this, "_buildings");
      this._buildings = [
        this._getResetOption(
          this.setting.buildings.temporalBattery,
          this._host.engine.i18n("$time.cfu.temporalBattery.label")
        ),
        this._getResetOption(
          this.setting.buildings.blastFurnace,
          this._host.engine.i18n("$time.cfu.blastFurnace.label")
        ),
        this._getResetOption(
          this.setting.buildings.timeBoiler,
          this._host.engine.i18n("$time.cfu.timeBoiler.label")
        ),
        this._getResetOption(
          this.setting.buildings.temporalAccelerator,
          this._host.engine.i18n("$time.cfu.temporalAccelerator.label")
        ),
        this._getResetOption(
          this.setting.buildings.temporalImpedance,
          this._host.engine.i18n("$time.cfu.temporalImpedance.label")
        ),
        this._getResetOption(
          this.setting.buildings.ressourceRetrieval,
          this._host.engine.i18n("$time.cfu.ressourceRetrieval.label")
        ),
        this._getResetOption(
          this.setting.buildings.temporalPress,
          this._host.engine.i18n("$time.cfu.temporalPress.label"),
          true
        ),
        this._getResetOption(
          this.setting.buildings.cryochambers,
          this._host.engine.i18n("$time.vsu.cryochambers.label")
        ),
        this._getResetOption(
          this.setting.buildings.voidHoover,
          this._host.engine.i18n("$time.vsu.voidHoover.label")
        ),
        this._getResetOption(
          this.setting.buildings.voidRift,
          this._host.engine.i18n("$time.vsu.voidRift.label")
        ),
        this._getResetOption(
          this.setting.buildings.chronocontrol,
          this._host.engine.i18n("$time.vsu.chronocontrol.label")
        ),
        this._getResetOption(
          this.setting.buildings.voidResonator,
          this._host.engine.i18n("$time.vsu.voidResonator.label")
        )
      ];
      const listBuildings = new SettingsList(this._host);
      listBuildings.addChildren(this._buildings);
      this.addChild(listBuildings);
    }
    _getResetOption(option, i18nName, delimiter = false, upgradeIndicator = false) {
      return new SettingTriggerLimitListItem(this._host, i18nName, option, {
        delimiter,
        onCheck: () => this._host.engine.imessage("status.reset.check.enable", [i18nName]),
        onUnCheck: () => this._host.engine.imessage("status.reset.check.disable", [i18nName]),
        upgradeIndicator
      });
    }
  }
  class ResetUpgradesSettingsUi extends IconSettingsPanel {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.upgrades");
      super(host, label, settings, {
        icon: Icons.Workshop
      });
      const items2 = [];
      for (const setting of Object.values(this.setting.upgrades)) {
        const label2 = this._host.engine.i18n(`$workshop.${setting.upgrade}.label`);
        const button = this._getResetOption(setting, label2);
        items2.push({ label: label2, button });
      }
      items2.sort((a, b) => a.label.localeCompare(b.label));
      let lastLetter = items2[0].label.charCodeAt(0);
      let lastItem = items2[0];
      for (const item of items2) {
        const subject = item.label.charCodeAt(0);
        if (subject !== lastLetter) {
          lastLetter = subject;
          lastItem.button.element.addClass("ks-delimiter");
        }
        lastItem = item;
      }
      const itemsList = new SettingsList(this._host);
      items2.forEach((button) => itemsList.addChild(button.button));
      this.addChild(itemsList);
    }
    _getResetOption(option, i18nName, delimiter = false, upgradeIndicator = false) {
      return new SettingListItem(this._host, i18nName, option, {
        delimiter,
        onCheck: () => this._host.engine.imessage("status.reset.check.enable", [i18nName]),
        onUnCheck: () => this._host.engine.imessage("status.reset.check.disable", [i18nName]),
        upgradeIndicator
      });
    }
  }
  class ResetSettingsUi extends SettingsPanel {
    constructor(host, settings, options) {
      super(host, host.engine.i18n("option.time.reset"), settings, options);
      __publicField(this, "_bonfireUi");
      __publicField(this, "_religionUi");
      __publicField(this, "_resourcesUi");
      __publicField(this, "_spaceUi");
      __publicField(this, "_timeUi");
      __publicField(this, "_upgradesUi");
      const list = new SettingsList(this._host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      this._bonfireUi = new ResetBonfireSettingsUi(this._host, this.setting.bonfire);
      this._religionUi = new ResetReligionSettingsUi(this._host, this.setting.religion);
      this._resourcesUi = new ResetResourcesSettingsUi(this._host, this.setting.resources);
      this._spaceUi = new ResetSpaceSettingsUi(this._host, this.setting.space);
      this._timeUi = new ResetTimeSettingsUi(this._host, this.setting.time);
      this._upgradesUi = new ResetUpgradesSettingsUi(this._host, this.setting.upgrades);
      list.addChildren([
        this._bonfireUi,
        this._religionUi,
        this._resourcesUi,
        this._spaceUi,
        this._timeUi,
        this._upgradesUi
      ]);
      this.addChild(list);
    }
  }
  class CyclesList extends SettingsList {
    /**
     * Constructs a `SeasonsList`.
     *
     * @param host A reference to the host.
     * @param setting The settings that correlate to this list.
     * @param options Options for this list.
     */
    constructor(host, setting, options) {
      super(host, options);
      __publicField(this, "setting");
      __publicField(this, "charon");
      __publicField(this, "umbra");
      __publicField(this, "yarn");
      __publicField(this, "helios");
      __publicField(this, "cath");
      __publicField(this, "redmoon");
      __publicField(this, "dune");
      __publicField(this, "piscine");
      __publicField(this, "terminus");
      __publicField(this, "kairo");
      this.setting = setting;
      this.addEventListener("enableAll", () => {
        this.setting.charon.enabled = true;
        this.setting.umbra.enabled = true;
        this.setting.yarn.enabled = true;
        this.setting.helios.enabled = true;
        this.setting.cath.enabled = true;
        this.setting.redmoon.enabled = true;
        this.setting.dune.enabled = true;
        this.setting.piscine.enabled = true;
        this.setting.terminus.enabled = true;
        this.setting.kairo.enabled = true;
        this.refreshUi();
      });
      this.addEventListener("disableAll", () => {
        this.setting.charon.enabled = false;
        this.setting.umbra.enabled = false;
        this.setting.yarn.enabled = false;
        this.setting.helios.enabled = false;
        this.setting.cath.enabled = false;
        this.setting.redmoon.enabled = false;
        this.setting.dune.enabled = false;
        this.setting.piscine.enabled = false;
        this.setting.terminus.enabled = false;
        this.setting.kairo.enabled = false;
        this.refreshUi();
      });
      this.charon = this._makeCycle(
        `⍙ ${this._host.engine.i18n("$space.planet.charon.label")}`,
        this.setting.charon
      );
      this.umbra = this._makeCycle(
        `⍦ ${this._host.engine.i18n("$space.planet.umbra.label")}`,
        this.setting.umbra
      );
      this.yarn = this._makeCycle(
        `⍧ ${this._host.engine.i18n("$space.planet.yarn.label")}`,
        this.setting.yarn
      );
      this.helios = this._makeCycle(
        `⌒ ${this._host.engine.i18n("$space.planet.helios.label")}`,
        this.setting.helios
      );
      this.cath = this._makeCycle(
        `⌾ ${this._host.engine.i18n("$space.planet.cath.label")}`,
        this.setting.cath
      );
      this.redmoon = this._makeCycle(
        `⍜ ${this._host.engine.i18n("$space.planet.moon.label")}`,
        this.setting.redmoon
      );
      this.dune = this._makeCycle(
        `⍫ ${this._host.engine.i18n("$space.planet.dune.label")}`,
        this.setting.dune
      );
      this.piscine = this._makeCycle(
        `⎈ ${this._host.engine.i18n("$space.planet.piscine.label")}`,
        this.setting.piscine
      );
      this.terminus = this._makeCycle(
        `⍝ ${this._host.engine.i18n("$space.planet.terminus.label")}`,
        this.setting.terminus
      );
      this.kairo = this._makeCycle(
        `℣ ${this._host.engine.i18n("$space.planet.kairo.label")}`,
        this.setting.kairo
      );
      this.addChildren([
        this.charon,
        this.umbra,
        this.yarn,
        this.helios,
        this.cath,
        this.redmoon,
        this.dune,
        this.piscine,
        this.terminus,
        this.kairo
      ]);
    }
    _makeCycle(label, setting) {
      return new SettingListItem(this._host, label, setting, {
        onCheck: () => this._host.engine.imessage("time.skip.cycle.enable", [label]),
        onUnCheck: () => this._host.engine.imessage("time.skip.cycle.disable", [label])
      });
    }
    refreshUi() {
      super.refreshUi();
      this.charon.refreshUi();
      this.umbra.refreshUi();
      this.yarn.refreshUi();
      this.helios.refreshUi();
      this.cath.refreshUi();
      this.redmoon.refreshUi();
      this.dune.refreshUi();
      this.piscine.refreshUi();
      this.terminus.refreshUi();
      this.kairo.refreshUi();
    }
  }
  class SeasonsList extends SettingsList {
    /**
     * Constructs a `SeasonsList`.
     *
     * @param host A reference to the host.
     * @param setting The settings that correlate to this list.
     * @param options Options for this list
     */
    constructor(host, setting, options) {
      super(host, options);
      __publicField(this, "setting");
      __publicField(this, "spring");
      __publicField(this, "summer");
      __publicField(this, "autumn");
      __publicField(this, "winter");
      this.setting = setting;
      this.addEventListener("enableAll", () => {
        this.setting.autumn.enabled = true;
        this.setting.spring.enabled = true;
        this.setting.summer.enabled = true;
        this.setting.winter.enabled = true;
        this.refreshUi();
      });
      this.addEventListener("disableAll", () => {
        this.setting.autumn.enabled = false;
        this.setting.spring.enabled = false;
        this.setting.summer.enabled = false;
        this.setting.winter.enabled = false;
        this.refreshUi();
      });
      this.spring = this._makeSeason(
        this._host.engine.i18n(`$calendar.season.spring`),
        this.setting.spring,
        options
      );
      this.summer = this._makeSeason(
        this._host.engine.i18n(`$calendar.season.summer`),
        this.setting.summer,
        options
      );
      this.autumn = this._makeSeason(
        this._host.engine.i18n(`$calendar.season.autumn`),
        this.setting.autumn,
        options
      );
      this.winter = this._makeSeason(
        this._host.engine.i18n(`$calendar.season.winter`),
        this.setting.winter,
        options
      );
      this.addChildren([this.spring, this.summer, this.autumn, this.winter]);
    }
    _makeSeason(label, setting, handler) {
      return new SettingListItem(this._host, label, setting, {
        onCheck: () => {
          var _a;
          return (_a = handler == null ? void 0 : handler.onCheck) == null ? void 0 : _a.call(handler, label, setting);
        },
        onUnCheck: () => {
          var _a;
          return (_a = handler == null ? void 0 : handler.onUnCheck) == null ? void 0 : _a.call(handler, label, setting);
        }
      });
    }
  }
  class TimeSkipSettingsUi extends SettingsPanel {
    constructor(host, settings, options) {
      const label = host.engine.i18n("option.time.skip");
      super(host, label, settings, options);
      __publicField(this, "_trigger");
      __publicField(this, "_maximum");
      __publicField(this, "_cycles");
      __publicField(this, "_seasons");
      this._trigger = new TriggerButton(host, label, settings, "integer");
      this._trigger.element.insertAfter(this._expando.element);
      this.children.add(this._trigger);
      this._maximum = new MaxButton(this._host, label, this.setting);
      this._cycles = new CollapsiblePanel(
        this._host,
        new LabelListItem(host, ucfirst(this._host.engine.i18n("ui.cycles")), {
          icon: Icons.Cycles
        }),
        {
          children: [new CyclesList(this._host, this.setting.cycles)]
        }
      );
      this._seasons = new CollapsiblePanel(
        this._host,
        new LabelListItem(host, ucfirst(this._host.engine.i18n("trade.seasons")), {
          icon: Icons.Seasons
        }),
        {
          children: [
            new SeasonsList(this._host, this.setting.seasons, {
              onCheck: (label2) => this._host.engine.imessage("time.skip.season.enable", [label2]),
              onUnCheck: (label2) => this._host.engine.imessage("time.skip.season.disable", [label2])
            })
          ]
        }
      );
      this.addChild(
        new SettingsList(this._host, {
          children: [
            new ButtonListItem(host, this._maximum, { delimiter: true }),
            this._cycles,
            this._seasons,
            new SettingListItem(this._host, "Ignore overheat", this.setting.ignoreOverheat)
          ],
          hasDisableAll: false,
          hasEnableAll: false
        })
      );
    }
  }
  class TimeControlSettingsUi extends SettingsSectionUi {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.timeCtrl");
      super(host, label, settings);
      __publicField(this, "_items");
      __publicField(this, "_accelerateTime");
      __publicField(this, "_timeSkipUi");
      __publicField(this, "_resetUi");
      const list = new SettingsList(this._host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      this._accelerateTime = new SettingTriggerListItem(
        this._host,
        this._host.engine.i18n("option.accelerate"),
        this.setting.accelerateTime,
        {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [label]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [label])
        }
      );
      this._timeSkipUi = new TimeSkipSettingsUi(this._host, this.setting.timeSkip);
      this._resetUi = new ResetSettingsUi(this._host, this.setting.reset);
      this._items = [this._accelerateTime, this._timeSkipUi, this._resetUi];
      list.addChildren(this._items);
      this.addChild(list);
    }
  }
  class TimeSettingsUi extends SettingsSectionUi {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.time");
      super(host, label, settings);
      __publicField(this, "_trigger");
      __publicField(this, "_buildings");
      __publicField(this, "_fixCryochamber");
      __publicField(this, "_turnOnChronoFurnace");
      this._trigger = new TriggerButton(host, label, settings);
      this._trigger.element.insertAfter(this._expando.element);
      this.children.add(this._trigger);
      const listBuildings = new SettingsList(this._host);
      this._buildings = [
        this._getTimeSetting(
          this.setting.buildings.temporalBattery,
          this._host.engine.i18n("$time.cfu.temporalBattery.label")
        ),
        this._getTimeSetting(
          this.setting.buildings.blastFurnace,
          this._host.engine.i18n("$time.cfu.blastFurnace.label")
        ),
        this._getTimeSetting(
          this.setting.buildings.timeBoiler,
          this._host.engine.i18n("$time.cfu.timeBoiler.label")
        ),
        this._getTimeSetting(
          this.setting.buildings.temporalAccelerator,
          this._host.engine.i18n("$time.cfu.temporalAccelerator.label")
        ),
        this._getTimeSetting(
          this.setting.buildings.temporalImpedance,
          this._host.engine.i18n("$time.cfu.temporalImpedance.label")
        ),
        this._getTimeSetting(
          this.setting.buildings.ressourceRetrieval,
          this._host.engine.i18n("$time.cfu.ressourceRetrieval.label")
        ),
        this._getTimeSetting(
          this.setting.buildings.temporalPress,
          this._host.engine.i18n("$time.cfu.temporalPress.label"),
          true
        ),
        this._getTimeSetting(
          this.setting.buildings.cryochambers,
          this._host.engine.i18n("$time.vsu.cryochambers.label")
        ),
        this._getTimeSetting(
          this.setting.buildings.voidHoover,
          this._host.engine.i18n("$time.vsu.voidHoover.label")
        ),
        this._getTimeSetting(
          this.setting.buildings.voidRift,
          this._host.engine.i18n("$time.vsu.voidRift.label")
        ),
        this._getTimeSetting(
          this.setting.buildings.chronocontrol,
          this._host.engine.i18n("$time.vsu.chronocontrol.label")
        ),
        this._getTimeSetting(
          this.setting.buildings.voidResonator,
          this._host.engine.i18n("$time.vsu.voidResonator.label")
        )
      ];
      listBuildings.addChildren(this._buildings);
      this.addChild(listBuildings);
      const listAddition = new SettingsList(this._host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      listAddition.addChild(new HeaderListItem(this._host, "Additional options"));
      this._fixCryochamber = new SettingListItem(
        this._host,
        this._host.engine.i18n("option.fix.cry"),
        this.setting.fixCryochambers,
        {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [
            this._host.engine.i18n("option.fix.cry")
          ]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
            this._host.engine.i18n("option.fix.cry")
          ])
        }
      );
      listAddition.addChild(this._fixCryochamber);
      this._turnOnChronoFurnace = new SettingListItem(
        this._host,
        this._host.engine.i18n("option.chronofurnace"),
        this.setting.turnOnChronoFurnace,
        {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [
            this._host.engine.i18n("option.chronofurnace")
          ]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
            this._host.engine.i18n("option.chronofurnace")
          ])
        }
      );
      listAddition.addChild(this._turnOnChronoFurnace);
      this.addChild(listAddition);
    }
    _getTimeSetting(setting, label, delimiter = false) {
      return new SettingMaxListItem(this._host, label, setting, {
        delimiter,
        onCheck: () => this._host.engine.imessage("status.sub.enable", [label]),
        onUnCheck: () => this._host.engine.imessage("status.sub.disable", [label])
      });
    }
  }
  class BuyButton extends TextButton {
    constructor(host, label, setting, handler = {}) {
      super(host, label, {
        onClick: () => {
          const value = SettingsSectionUi.promptFloat(
            host.engine.i18n("blackcoin.buy.threshold"),
            setting.buy.toString()
          );
          if (value !== null) {
            setting.buy = value;
            this.refreshUi();
          }
          if (handler.onClick) {
            handler.onClick();
          }
        },
        title: setting.buy.toFixed(3)
      });
      __publicField(this, "setting");
      this.element.addClass("ks-buy-button");
      this.setting = setting;
    }
    refreshUi() {
      super.refreshUi();
      this.element.prop("title", this.setting.buy.toFixed(3));
      this.element.text(
        this._host.engine.i18n("ui.buy", [SettingsSectionUi.renderFloat(this.setting.buy)])
      );
    }
  }
  class SellButton extends TextButton {
    constructor(host, label, setting, handler = {}) {
      super(host, label, {
        onClick: () => {
          const value = SettingsSectionUi.promptFloat(
            host.engine.i18n("blackcoin.sell.threshold"),
            setting.sell.toString()
          );
          if (value !== null) {
            setting.sell = value;
            this.refreshUi();
          }
          if (handler.onClick) {
            handler.onClick();
          }
        },
        title: setting.sell.toFixed(3)
      });
      __publicField(this, "setting");
      this.element.addClass("ks-sell-button");
      this.setting = setting;
    }
    refreshUi() {
      super.refreshUi();
      this.element.prop("title", this.setting.sell.toFixed(3));
      this.element.text(
        this._host.engine.i18n("ui.sell", [SettingsSectionUi.renderFloat(this.setting.sell)])
      );
    }
  }
  class SettingBuySellTriggerListItem extends SettingListItem {
    constructor(host, label, setting, options) {
      super(host, label, setting, options);
      __publicField(this, "buyButton");
      __publicField(this, "sellButton");
      __publicField(this, "triggerButton");
      const triggerLabel = host.engine.i18n("blackcoin.buy.trigger");
      this.triggerButton = new TriggerButton(host, triggerLabel, setting, options == null ? void 0 : options.behavior);
      this.element.append(this.triggerButton.element);
      this.sellButton = new SellButton(host, label, setting);
      this.element.append(this.sellButton.element);
      this.buyButton = new BuyButton(host, label, setting);
      this.element.append(this.buyButton.element);
    }
    refreshUi() {
      super.refreshUi();
      this.buyButton.refreshUi();
      this.sellButton.refreshUi();
      this.triggerButton.refreshUi();
    }
  }
  class LimitedButton extends UiComponent {
    constructor(host, setting, options) {
      super(host, options);
      __publicField(this, "setting");
      __publicField(this, "element");
      __publicField(this, "checkbox");
      const element = $("<div/>").addClass("ks-text-button");
      const elementLabel = $("<label/>", {
        text: host.engine.i18n("ui.limit")
      });
      const checkbox = $("<input/>", {
        type: "checkbox"
      });
      checkbox.on("change", () => {
        var _a, _b;
        if (checkbox.is(":checked") && setting.limited === false) {
          setting.limited = true;
          (_a = options == null ? void 0 : options.onLimitedCheck) == null ? void 0 : _a.call(options);
        } else if (!checkbox.is(":checked") && setting.limited === true) {
          setting.limited = false;
          (_b = options == null ? void 0 : options.onLimitedUnCheck) == null ? void 0 : _b.call(options);
        }
      });
      elementLabel.prepend(checkbox);
      element.append(elementLabel);
      this.checkbox = checkbox;
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
      this.setting = setting;
    }
    refreshUi() {
      super.refreshUi();
      this.checkbox.prop("checked", this.setting.limited);
    }
  }
  class SettingLimitedListItem extends SettingListItem {
    /**
     * Create a UI element for a setting that can be limited.
     * This will result in an element with a checkbox that has a "Limited" label.
     *
     * @param host The userscript instance.
     * @param label The label for the setting.
     * @param setting The setting model.
     * @param options Options for the list item.
     */
    constructor(host, label, setting, options) {
      super(host, label, setting, options);
      __publicField(this, "limitedButton");
      this.limitedButton = new LimitedButton(host, setting, options);
      this.element.append(this.limitedButton.element);
    }
    refreshUi() {
      super.refreshUi();
      this.limitedButton.refreshUi();
    }
  }
  class EmbassySettingsUi extends SettingsPanel {
    constructor(host, settings, options) {
      const label = host.engine.i18n("option.embassies");
      super(host, label, settings, options);
      __publicField(this, "_trigger");
      __publicField(this, "_races");
      this._trigger = new TriggerButton(host, label, settings);
      this._trigger.element.insertAfter(this._expando.element);
      this.children.add(this._trigger);
      const listRaces = new SettingsList(this._host);
      this._races = [
        this._makeEmbassySetting(
          this.setting.races.lizards,
          this._host.engine.i18n(`$trade.race.lizards`)
        ),
        this._makeEmbassySetting(
          this.setting.races.sharks,
          this._host.engine.i18n(`$trade.race.sharks`)
        ),
        this._makeEmbassySetting(
          this.setting.races.griffins,
          this._host.engine.i18n(`$trade.race.griffins`)
        ),
        this._makeEmbassySetting(
          this.setting.races.nagas,
          this._host.engine.i18n(`$trade.race.nagas`)
        ),
        this._makeEmbassySetting(
          this.setting.races.zebras,
          this._host.engine.i18n(`$trade.race.zebras`)
        ),
        this._makeEmbassySetting(
          this.setting.races.spiders,
          this._host.engine.i18n(`$trade.race.spiders`)
        ),
        this._makeEmbassySetting(
          this.setting.races.dragons,
          this._host.engine.i18n(`$trade.race.dragons`)
        ),
        this._makeEmbassySetting(
          this.setting.races.leviathans,
          this._host.engine.i18n(`$trade.race.leviathans`)
        )
      ];
      listRaces.addChildren(this._races);
      this.addChild(listRaces);
    }
    _makeEmbassySetting(option, label) {
      return new SettingMaxListItem(this._host, label, option, {
        onCheck: () => this._host.engine.imessage("status.sub.enable", [label]),
        onUnCheck: () => this._host.engine.imessage("status.sub.disable", [label])
      });
    }
  }
  class TradeSettingsUi extends SettingsSectionUi {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.trade");
      super(host, label, settings);
      __publicField(this, "_trigger");
      __publicField(this, "_races");
      __publicField(this, "_embassiesUi");
      __publicField(this, "_feedLeviathans");
      __publicField(this, "_tradeBlackcoin");
      __publicField(this, "_unlockRaces");
      this._trigger = new TriggerButton(host, label, settings);
      this._trigger.element.insertAfter(this._expando.element);
      this.children.add(this._trigger);
      const listRaces = new SettingsList(this._host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      this._races = [
        this._getTradeOption(
          "lizards",
          this.setting.races.lizards,
          this._host.engine.i18n("$trade.race.lizards")
        ),
        this._getTradeOption(
          "sharks",
          this.setting.races.sharks,
          this._host.engine.i18n("$trade.race.sharks")
        ),
        this._getTradeOption(
          "griffins",
          this.setting.races.griffins,
          this._host.engine.i18n("$trade.race.griffins")
        ),
        this._getTradeOption(
          "nagas",
          this.setting.races.nagas,
          this._host.engine.i18n("$trade.race.nagas")
        ),
        this._getTradeOption(
          "zebras",
          this.setting.races.zebras,
          this._host.engine.i18n("$trade.race.zebras")
        ),
        this._getTradeOption(
          "spiders",
          this.setting.races.spiders,
          this._host.engine.i18n("$trade.race.spiders")
        ),
        this._getTradeOption(
          "dragons",
          this.setting.races.dragons,
          this._host.engine.i18n("$trade.race.dragons"),
          true
        ),
        this._getTradeOption(
          "leviathans",
          this.setting.races.leviathans,
          this._host.engine.i18n("$trade.race.leviathans")
        )
      ];
      listRaces.addChildren(this._races);
      this._feedLeviathans = new SettingListItem(
        this._host,
        this._host.engine.i18n("option.autofeed"),
        this.setting.feedLeviathans,
        {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [
            this._host.engine.i18n("option.autofeed")
          ]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
            this._host.engine.i18n("option.autofeed")
          ])
        }
      );
      listRaces.addChild(this._feedLeviathans);
      this._tradeBlackcoin = new SettingBuySellTriggerListItem(
        this._host,
        this._host.engine.i18n("option.crypto"),
        this.setting.tradeBlackcoin,
        {
          behavior: "integer",
          delimiter: true,
          onCheck: () => this._host.engine.imessage("status.sub.enable", [
            this._host.engine.i18n("option.crypto")
          ]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
            this._host.engine.i18n("option.crypto")
          ])
        }
      );
      listRaces.addChild(this._tradeBlackcoin);
      this.addChild(listRaces);
      const listAddition = new SettingsList(this._host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      listAddition.addChild(new HeaderListItem(this._host, "Additional options"));
      this._embassiesUi = new EmbassySettingsUi(this._host, this.setting.buildEmbassies);
      listAddition.addChild(this._embassiesUi);
      this._unlockRaces = new SettingListItem(
        this._host,
        this._host.engine.i18n("ui.upgrade.races"),
        this.setting.unlockRaces,
        {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [
            this._host.engine.i18n("ui.upgrade.races")
          ]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
            this._host.engine.i18n("ui.upgrade.races")
          ])
        }
      );
      listAddition.addChild(this._unlockRaces);
      this.addChild(listAddition);
    }
    _getTradeOption(name, option, i18nName, delimiter = false, upgradeIndicator = false) {
      const settingItem = new SettingLimitedListItem(this._host, i18nName, option, {
        onCheck: () => this._host.engine.imessage("status.sub.enable", [i18nName]),
        onUnCheck: () => this._host.engine.imessage("status.sub.disable", [i18nName]),
        onLimitedCheck: () => this._host.engine.imessage("trade.limited", [i18nName]),
        onLimitedUnCheck: () => this._host.engine.imessage("trade.unlimited", [i18nName]),
        delimiter,
        upgradeIndicator
      });
      const panel = new SettingsPanel(this._host, i18nName, option, {
        settingItem
      });
      const seasons = new SeasonsList(this._host, option.seasons, {
        onCheck: (label) => this._host.engine.imessage("trade.season.enable", [ucfirst(name), label]),
        onUnCheck: (label) => this._host.engine.imessage("trade.season.disable", [ucfirst(name), label])
      });
      panel.addChild(seasons);
      return panel;
    }
  }
  class VillageSettingsUi extends SettingsSectionUi {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.distribute");
      super(host, label, settings);
      __publicField(this, "_jobs");
      __publicField(this, "_hunt");
      __publicField(this, "_festivals");
      __publicField(this, "_promoteKittens");
      __publicField(this, "_promoteLeader");
      __publicField(this, "_electLeader");
      const listJobs = new SettingsList(this._host);
      this._jobs = [
        this._getDistributeOption(
          this.setting.jobs.woodcutter,
          this._host.engine.i18n("$village.job.woodcutter")
        ),
        this._getDistributeOption(
          this.setting.jobs.farmer,
          this._host.engine.i18n("$village.job.farmer")
        ),
        this._getDistributeOption(
          this.setting.jobs.scholar,
          this._host.engine.i18n("$village.job.scholar")
        ),
        this._getDistributeOption(
          this.setting.jobs.hunter,
          this._host.engine.i18n("$village.job.hunter")
        ),
        this._getDistributeOption(
          this.setting.jobs.miner,
          this._host.engine.i18n("$village.job.miner")
        ),
        this._getDistributeOption(
          this.setting.jobs.priest,
          this._host.engine.i18n("$village.job.priest")
        ),
        this._getDistributeOption(
          this.setting.jobs.geologist,
          this._host.engine.i18n("$village.job.geologist")
        ),
        this._getDistributeOption(
          this.setting.jobs.engineer,
          this._host.engine.i18n("$village.job.engineer")
        )
      ];
      listJobs.addChildren(this._jobs);
      this.addChild(listJobs);
      const listAddition = new SettingsList(this._host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      listAddition.addChild(new HeaderListItem(this._host, "Additional options"));
      this._hunt = new SettingTriggerListItem(
        this._host,
        this._host.engine.i18n("option.hunt"),
        this.setting.hunt,
        {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [this._host.engine.i18n("option.hunt")]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [this._host.engine.i18n("option.hunt")])
        }
      );
      listAddition.addChild(this._hunt);
      this._festivals = new SettingListItem(
        this._host,
        this._host.engine.i18n("option.festival"),
        this.setting.holdFestivals,
        {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [
            this._host.engine.i18n("option.festival")
          ]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
            this._host.engine.i18n("option.festival")
          ])
        }
      );
      listAddition.addChild(this._festivals);
      this._promoteKittens = new SettingTriggerListItem(
        this._host,
        this._host.engine.i18n("option.promotekittens"),
        this.setting.promoteKittens,
        {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [
            this._host.engine.i18n("option.promotekittens")
          ]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
            this._host.engine.i18n("option.promotekittens")
          ])
        }
      );
      listAddition.addChild(this._promoteKittens);
      this._promoteLeader = new SettingListItem(
        this._host,
        this._host.engine.i18n("option.promote"),
        this.setting.promoteLeader,
        {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [
            this._host.engine.i18n("option.promote")
          ]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
            this._host.engine.i18n("option.promote")
          ])
        }
      );
      listAddition.addChild(this._promoteLeader);
      this._electLeader = new SettingListItem(this._host, "Elect leader", this.setting.electLeader, {
        children: [
          new OptionsListItem(host, "Job", this.setting.electLeader.job),
          new OptionsListItem(host, "Trait", this.setting.electLeader.trait)
        ],
        onCheck: () => this._host.engine.imessage("status.sub.enable", [this._host.engine.i18n("option.elect")]),
        onUnCheck: () => this._host.engine.imessage("status.sub.disable", [this._host.engine.i18n("option.elect")])
      });
      listAddition.addChild(this._electLeader);
      this.addChild(listAddition);
    }
    _getDistributeOption(option, label, delimiter = false) {
      return new SettingMaxListItem(this._host, label, option, {
        delimiter,
        onCheck: () => this._host.engine.imessage("status.sub.enable", [label]),
        onUnCheck: () => this._host.engine.imessage("status.sub.disable", [label])
      });
    }
  }
  class SettingLimitedMaxListItem extends SettingLimitedListItem {
    /**
     * Create a UI element for a setting that can be limited and has a maximum.
     * This will result in an element with a checkbox that has a "Limited" label
     * and control the `limited` property of the setting.
     * It will also have a "Max" indicator, which controls the respective `max`
     * property in the setting model.
     *
     * @param host The userscript instance.
     * @param label The label for the setting.
     * @param setting The setting model.
     * @param options Options for the list item.
     */
    constructor(host, label, setting, options) {
      super(host, label, setting, options);
      __publicField(this, "maxButton");
      this.maxButton = new MaxButton(host, label, setting);
      this.element.append(this.maxButton.element);
    }
    refreshUi() {
      super.refreshUi();
      this.maxButton.refreshUi();
    }
  }
  class UpgradeSettingsUi extends SettingsPanel {
    constructor(host, settings, options) {
      super(host, host.engine.i18n("ui.upgrade.upgrades"), settings, options);
      const items2 = [];
      for (const setting of Object.values(this.setting.upgrades)) {
        const label = this._host.engine.i18n(`$workshop.${setting.upgrade}.label`);
        const button = new SettingListItem(this._host, label, setting, {
          onCheck: () => this._host.engine.imessage("status.sub.enable", [label]),
          onUnCheck: () => this._host.engine.imessage("status.sub.disable", [label])
        });
        items2.push({ label, button });
      }
      items2.sort((a, b) => a.label.localeCompare(b.label));
      let lastLetter = items2[0].label.charCodeAt(0);
      let lastItem = items2[0];
      for (const item of items2) {
        const subject = item.label.charCodeAt(0);
        if (subject !== lastLetter) {
          lastLetter = subject;
          lastItem.button.element.addClass("ks-delimiter");
        }
        lastItem = item;
      }
      const itemsList = new SettingsList(this._host);
      items2.forEach((button) => itemsList.addChild(button.button));
      this.addChild(itemsList);
    }
  }
  class WorkshopSettingsUi extends SettingsSectionUi {
    constructor(host, settings) {
      const label = host.engine.i18n("ui.craft");
      super(host, label, settings);
      __publicField(this, "_trigger");
      this._trigger = new TriggerButton(host, label, settings);
      this._trigger.element.insertAfter(this._expando.element);
      this.children.add(this._trigger);
      const listCrafts = new SettingsList(this._host, {
        children: [
          this._getCraftOption(
            this.setting.resources.wood,
            this._host.engine.i18n("$workshop.crafts.wood.label")
          ),
          this._getCraftOption(
            this.setting.resources.beam,
            this._host.engine.i18n("$workshop.crafts.beam.label")
          ),
          this._getCraftOption(
            this.setting.resources.slab,
            this._host.engine.i18n("$workshop.crafts.slab.label")
          ),
          this._getCraftOption(
            this.setting.resources.steel,
            this._host.engine.i18n("$workshop.crafts.steel.label")
          ),
          this._getCraftOption(
            this.setting.resources.plate,
            this._host.engine.i18n("$workshop.crafts.plate.label")
          ),
          this._getCraftOption(
            this.setting.resources.alloy,
            this._host.engine.i18n("$workshop.crafts.alloy.label")
          ),
          this._getCraftOption(
            this.setting.resources.concrate,
            this._host.engine.i18n("$workshop.crafts.concrate.label")
          ),
          this._getCraftOption(
            this.setting.resources.gear,
            this._host.engine.i18n("$workshop.crafts.gear.label")
          ),
          this._getCraftOption(
            this.setting.resources.scaffold,
            this._host.engine.i18n("$workshop.crafts.scaffold.label")
          ),
          this._getCraftOption(
            this.setting.resources.ship,
            this._host.engine.i18n("$workshop.crafts.ship.label")
          ),
          new SettingListItem(
            this._host,
            this._host.engine.i18n("option.shipOverride"),
            this.setting.shipOverride,
            {
              onCheck: () => this._host.engine.imessage("status.sub.enable", [
                this._host.engine.i18n("option.shipOverride")
              ]),
              onUnCheck: () => this._host.engine.imessage("status.sub.disable", [
                this._host.engine.i18n("option.shipOverride")
              ]),
              upgradeIndicator: true
            }
          ),
          this._getCraftOption(
            this.setting.resources.tanker,
            this._host.engine.i18n("$workshop.crafts.tanker.label"),
            true
          ),
          this._getCraftOption(
            this.setting.resources.parchment,
            this._host.engine.i18n("$workshop.crafts.parchment.label")
          ),
          this._getCraftOption(
            this.setting.resources.manuscript,
            this._host.engine.i18n("$workshop.crafts.manuscript.label")
          ),
          this._getCraftOption(
            this.setting.resources.compedium,
            this._host.engine.i18n("$workshop.crafts.compedium.label")
          ),
          this._getCraftOption(
            this.setting.resources.blueprint,
            this._host.engine.i18n("$workshop.crafts.blueprint.label"),
            true
          ),
          this._getCraftOption(
            this.setting.resources.kerosene,
            this._host.engine.i18n("$workshop.crafts.kerosene.label")
          ),
          this._getCraftOption(
            this.setting.resources.megalith,
            this._host.engine.i18n("$workshop.crafts.megalith.label")
          ),
          this._getCraftOption(
            this.setting.resources.eludium,
            this._host.engine.i18n("$workshop.crafts.eludium.label")
          ),
          this._getCraftOption(
            this.setting.resources.thorium,
            this._host.engine.i18n("$workshop.crafts.thorium.label")
          )
        ],
        onReset: () => {
          this.setting.load({ resources: new WorkshopSettings().resources });
          this.refreshUi();
        }
      });
      this.addChild(listCrafts);
      this.addChild(
        new SettingsList(this._host, {
          children: [new UpgradeSettingsUi(this._host, this.setting.unlockUpgrades)],
          hasDisableAll: false,
          hasEnableAll: false
        })
      );
    }
    _getCraftOption(option, label, delimiter = false, upgradeIndicator = false) {
      return new SettingLimitedMaxListItem(this._host, label, option, {
        delimiter,
        onCheck: () => this._host.engine.imessage("status.sub.enable", [label]),
        onUnCheck: () => this._host.engine.imessage("status.sub.disable", [label]),
        onLimitedCheck: () => this._host.engine.imessage("craft.limited", [label]),
        onLimitedUnCheck: () => this._host.engine.imessage("craft.unlimited", [label]),
        upgradeIndicator
      });
    }
  }
  class UserInterface extends UiComponent {
    constructor(host) {
      super(host);
      __publicField(this, "element");
      __publicField(this, "showActivity");
      __publicField(this, "_engineUi");
      __publicField(this, "_sections");
      const engine = this._host.engine;
      this._engineUi = new EngineSettingsUi(this._host, engine.settings);
      this._sections = [
        new BonfireSettingsUi(this._host, engine.bonfireManager.settings),
        new VillageSettingsUi(this._host, engine.villageManager.settings),
        new ScienceSettingsUi(this._host, engine.scienceManager.settings),
        new WorkshopSettingsUi(this._host, engine.workshopManager.settings),
        new ResourcesSettingsUi(this._host, engine.settings.resources),
        new TradeSettingsUi(this._host, engine.tradeManager.settings),
        new ReligionSettingsUi(this._host, engine.religionManager.settings),
        new SpaceSettingsUi(this._host, engine.spaceManager.settings),
        new TimeSettingsUi(this._host, engine.timeManager.settings),
        new TimeControlSettingsUi(this._host, engine.timeControlManager.settings),
        new LogFiltersSettingsUi(this._host, engine.settings.filters),
        new StateManagementUi(this._host, engine.settings.states),
        new InternalsUi(this._host, engine.settings)
      ];
      this._installCss();
      const version = "Kitten Scientists " + ksVersion("v");
      const ks = $("<div/>", { id: "ks" });
      const optionsTitleElement = $("<div/>", {
        id: "ks-version",
        text: version
      });
      ks.append(optionsTitleElement);
      const optionsListElement = $("<ul/>");
      optionsListElement.append(this._engineUi.element);
      this._sections.forEach((section) => optionsListElement.append(section.element));
      ks.append(optionsListElement);
      const expando = this._engineUi.expando;
      let sectionsVisible = false;
      expando.element.on("click", () => {
        sectionsVisible = !sectionsVisible;
        for (const section of this._sections) {
          section.toggle(sectionsVisible, true);
        }
      });
      let panelsOpen = 0;
      for (const section of this._sections) {
        section.addEventListener("panelHidden", () => {
          --panelsOpen;
          if (panelsOpen === 0) {
            sectionsVisible = false;
          }
          if (!sectionsVisible) {
            expando.setCollapsed();
          }
        });
        section.addEventListener("panelShown", () => {
          ++panelsOpen;
          sectionsVisible = true;
          expando.setExpanded();
        });
      }
      this.showActivity = $("<span/>", {
        html: `<svg style="width: 15px; height: 15px;" viewBox="0 0 48 48"><path fill="currentColor" d="${Icons.Summary}"/></svg>`,
        title: this._host.engine.i18n("summary.show")
      }).addClass("ks-show-activity");
      this.showActivity.on("click", () => this._host.engine.displayActivitySummary());
      $("#clearLog").prepend(this.showActivity);
      const right = $("#rightColumn");
      if (right.length === 0) {
        const optionsPageContent = $("#optionsPage .full-screen-position .page .page-content");
        if (optionsPageContent.length === 0) {
          cwarn("Unable to find right column to inject UI into. Running headless.");
        } else {
          optionsPageContent.append(ks);
          ks.attr("style", "border-top:1px solid grey; padding:15px");
        }
      } else {
        right.prepend(ks);
      }
      this.element = ks;
    }
    destroy() {
      this.showActivity.remove();
      this.element.remove();
    }
    refreshUi() {
      this._engineUi.refreshUi();
      for (const section of this._sections) {
        section.refreshUi();
      }
    }
    _installCss() {
      this._addRule(
        `#ks {
        margin-bottom: 10px;
        padding-right: 10px;
      }`
      );
      this._addRule(
        `#ks #ks-version {
        margin: 2px 0 2px 2px;
      }`
      );
      this._addRule("#ks ul { list-style: none; margin: 0; padding: 0; }");
      this._addRule('#ks ul:after { clear: both; content: " "; display: block; height: 0; }');
      this._addRule(
        `#ks .ks-checkbox {
        margin: 1px 5px 2px 2px;
       }`
      );
      this._addRule(
        `#ks .ks-fieldset {
        border-bottom: none;
        border-right: none;
        border-top: none;
       }`
      );
      this._addRule(
        `#ks ul li { 
        float: left;
        width: 100%;
        border-bottom: 1px solid transparent;
        transition: .3s;
      }`
      );
      this._addRule(
        `#ks ul li .ks-panel-content { 
        border-left: 1px dashed grey;
        padding-left: 16px;
        margin-left: 8px;
        margin-top: 5px;
      }`
      );
      this._addRule(
        `#ks ul .ks-setting.ks-expanded { 
        margin-bottom: 10px;
      }`
      );
      this._addRule(
        `#ks ul .ks-setting:not(.ks-expanded):hover { 
        border-bottom: 1px solid rgba(185, 185, 185, 0.5);
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-label {
        display: inline-block;
        min-width: 120px;
        opacity: 0.8;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-label:hover {
        opacity: 1;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-expando-button {
        border: 1px solid rgba(255, 255, 255, 0.2);
        cursor: pointer;
        display: block;
        float: right;
        min-width: 10px;
        padding: 0px 3px;
        text-align: center;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-icon-button {
        cursor: pointer;
        display: block;
        float: right;
        padding-right: 3px;
        line-height: 0;
        opacity: 0.8;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-icon-button:hover {
        opacity: 1;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-icon-label {
        display: inline-block;
        margin-right: 4px;
        margin-left: 2px;
        vertical-align: middle;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-text-button {
        cursor: pointer;
        display: inline-block;
        max-width: 315px;
        user-select: none;
        opacity: 0.8;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-text-button:hover {
        opacity: 1;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-header {
        display: inline-block;
        font-weight: bold;
        min-width: 100px;
        user-select: none;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-explainer {
        color: #888;
        display: inline-block;
        min-width: 100px;
        user-select: none;
        padding: 4px;
        user-select: none;
        white-space: break-spaces;
      }`
      );
      this._addRule(
        // This compensates the floating tools below the list.
        `#ks ul li.ks-setting .ks-list-container {
        margin-bottom: 4px;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-list.ks-items-list {
        user-select: none;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-list ~ .ks-list-tools {
        border-top: 1px dotted grey;
        margin-left: 0px;
        margin-top: 2px;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-list ~ .ks-list-tools .ks-icon-button {
        display: inline-block;
        float: none;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-max-button {
        float: right;
        padding-right: 5px;
        padding-top: 2px;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-stock-button {
        display: inline-block;
        min-width: 86px;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-buy-button {
        display: inline-block;
        float: right;
        padding-right: 10px;
        min-width: 86px;
      }`
      );
      this._addRule(
        `#ks ul li.ks-setting .ks-sell-button {
        display: inline-block;
        float: right;
        padding-right: 10px;
        min-width: 86px;
      }`
      );
      this._addRule(
        `#ks ul .ks-delimiter {
        margin-bottom: 10px;
      }`
      );
      this._addRule(`
      #ks #toggle-list-resources .stockWarn *,
      #ks #toggle-reset-list-resources .stockWarn * {
        color: #DD1E00;
      }`);
      this._addRule(
        `#game .ks-show-activity {
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
      }`
      );
      this._addRule("#game #rightColumn { overflow-y: auto }");
      this._addRule("#game .res-row .res-cell.ks-stock-above { color: green; }");
      this._addRule("#game .res-row .res-cell.ks-stock-below { color: red; }");
    }
    _addRule(rule) {
      const styleSheetId = "kitten-scientists-styles";
      let styleSheet = document.getElementById(styleSheetId);
      if (isNil(styleSheet)) {
        styleSheet = document.createElement("style");
        styleSheet.id = styleSheetId;
        document.head.appendChild(styleSheet);
      }
      const sheet = mustExist(styleSheet.sheet);
      sheet.insertRule(rule);
    }
  }
  const FallbackLanguage = "en";
  const ksVersion = (prefix = "") => {
    if (isNil("2.0.0-beta.8")) {
      throw Error(`Build error: KS_VERSION is not defined.`);
    }
    return `${prefix}${"2.0.0-beta.8"}`;
  };
  const TIMEOUT_DEFAULT = 2 * 60 * 1e3;
  const TIMEOUT_OVERRIDE = "localStorage" in globalThis && !isNil(localStorage["ks.timeout"]) ? Number(localStorage["ks.timeout"]) : void 0;
  const _UserScript = class _UserScript {
    constructor(game2, i18nEngine, gameLanguage = FallbackLanguage) {
      __publicField(this, "game");
      /**
       * A function in the game that allows to retrieve translated messages.
       *
       * Ideally, you should never access this directly and instead use the
       * i18n interface provided by `Engine`.
       */
      __publicField(this, "i18nEngine");
      __publicField(this, "_userInterface");
      __publicField(this, "engine");
      __publicField(this, "_saveManager", {
        load: (saveData) => {
          cinfo("Looking for Kitten Scientists engine state in save data...");
          const state = _UserScript._tryEngineStateFromSaveData(saveData);
          if (!state) {
            return;
          }
          cinfo("Found Kitten Scientists engine state in save data.");
          this.engine.stateLoad(state);
          this.refreshUi();
        },
        resetState: () => null,
        save: (saveData) => {
        }
      });
      cinfo(`Kitten Scientists ${ksVersion("v")} constructed.`);
      cinfo(`You are on the '${String("stable")}' release channel.`);
      this.game = game2;
      this.i18nEngine = i18nEngine;
      this.engine = new Engine(this, gameLanguage);
      this._userInterface = this._constructUi();
    }
    _constructUi() {
      const ui = new UserInterface(this);
      ui.refreshUi();
      return ui;
    }
    rebuildUi() {
      this._userInterface.destroy();
      this._userInterface = this._constructUi();
    }
    /**
     * Runs some validations against the game to determine if internal control
     * structures still match up with expectations.
     * Issues should be logged to the console.
     */
    validateGame() {
      ScienceSettings.validateGame(this.game, this.engine.scienceManager.settings);
      SpaceSettings.validateGame(this.game, this.engine.spaceManager.settings);
      WorkshopSettings.validateGame(this.game, this.engine.workshopManager.settings);
    }
    /**
     * Start the user script after loading and configuring it.
     */
    run() {
      this.game.console.maxMessages = 1e3;
      this.refreshUi();
      if (this.engine.settings.enabled) {
        this.engine.start(true);
      }
      this.engine.imessage("status.ks.init");
      this.runUpdateCheck().catch(console.error);
      _UserScript.window.dojo.subscribe("game/beforesave", (saveData) => {
        cinfo("Injecting Kitten Scientists engine state into save data...");
        saveData.ks = { state: [this.getSettings()] };
      });
    }
    /**
     * Check which versions of KS are currently published.
     */
    async runUpdateCheck() {
      try {
        const response = await fetch("https://kitten-science.com/release-info.json");
        const releaseInfo = await response.json();
        cdebug(releaseInfo);
        if (!isNil("2.0.0-beta.8") && gt$1(releaseInfo["stable"].version, "2.0.0-beta.8")) {
          this.engine.imessage("status.ks.upgrade", [
            releaseInfo["stable"].version,
            "2.0.0-beta.8",
            releaseInfo["stable"].url.release
          ]);
        }
      } catch (error2) {
        cwarn("Update check failed.");
        cwarn(error2);
      }
    }
    /**
     * Requests the user interface to refresh.
     */
    refreshUi() {
      this._userInterface.refreshUi();
    }
    //#region Settings
    /**
     * Encodes an engine states into a string.
     *
     * @param settings The engine state to encode.
     * @param compress Should we use LZString compression?
     * @returns The settings encoded into a string.
     */
    static encodeSettings(settings, compress = true) {
      const settingsString = JSON.stringify(settings);
      return compress ? window.LZString.compressToBase64(settingsString) : settingsString;
    }
    /**
     * Given a serialized engine state, attempts to deserialize that engine state.
     * Assumes the input has been compressed with LZString, will accept uncompressed.
     *
     * @param compressedSettings An engine state that has previously been serialized to a string.
     * @returns The engine state, if valid.
     */
    static decodeSettings(compressedSettings) {
      try {
        const naiveParse = JSON.parse(compressedSettings);
        return _UserScript.unknownAsEngineStateOrThrow(naiveParse);
      } catch (error2) {
      }
      const settingsString = window.LZString.decompressFromBase64(compressedSettings);
      const parsed = JSON.parse(settingsString);
      return _UserScript.unknownAsEngineStateOrThrow(parsed);
    }
    /**
     * Retrieves the state from the engine.
     *
     * @returns The engine state.
     */
    getSettings() {
      return this.engine.stateSerialize();
    }
    getSettingsAsJson() {
      return JSON.stringify(this.getSettings());
    }
    /**
     * Updates the engine with a new state.
     *
     * @param settings The engine state to apply.
     */
    setSettings(settings) {
      cinfo("Loading engine state...");
      this.engine.stateLoad(settings);
      this._userInterface.refreshUi();
    }
    /**
     * Loads an encoded state into the engine.
     *
     * @param encodedSettings The encoded settings.
     */
    importSettingsFromString(encodedSettings) {
      const settings = _UserScript.decodeSettings(encodedSettings);
      this.setSettings(settings);
      this.engine.imessage("settings.imported");
    }
    /**
     * Import settings from a URL.
     * This is an experimental feature, and only allows using profiles from
     * https://kitten-science.com/ at this time.
     *
     * @param url - The URL of the profile to load.
     */
    async importSettingsFromUrl(url) {
      const importState = new State(url);
      const settings = await importState.resolve();
      settings.report.aggregate(console);
      const stateIsValid = await importState.validate();
      if (!stateIsValid) {
        cerror("Imported state is invalid and not imported.");
        return;
      }
      const state = importState.merge();
      this.setSettings(state);
      this.engine.imessage("settings.imported");
    }
    /**
     * Copies an engine state to the clipboard.
     *
     * @param settings The engine state to copy to the clipboard.
     * The default is this engine's current state.
     * @param compress Should the state be compressed?
     */
    async copySettings(settings = this.getSettings(), compress = true) {
      const encodedSettings = _UserScript.encodeSettings(settings, compress);
      await window.navigator.clipboard.writeText(encodedSettings);
      this.engine.imessage("settings.copied");
    }
    /**
     * Determines if an object is an engine state, and throws an
     * exception otherwise.
     *
     * @param subject The object that is hopefully an engine state.
     * @param subject.v The version in the engine state.
     * @returns An engine state.
     */
    static unknownAsEngineStateOrThrow(subject) {
      const v = subject == null ? void 0 : subject.v;
      if (!isNil(v) && typeof v === "string") {
        if (v.startsWith("2")) {
          return subject;
        }
      }
      throw new Error("Not a valid engine state.");
    }
    //#endregion
    installSaveManager() {
      cinfo("Installing save game manager...");
      this.game.managers.push(this._saveManager);
    }
    static _tryEngineStateFromSaveData(saveData) {
      if ("ks" in saveData === false) {
        cdebug("Failed: `ks` not found in save data.");
        return;
      }
      const ksData = saveData.ks;
      if ("state" in ksData === false) {
        cdebug("Failed: `ks.state` not found in save data.");
        return;
      }
      const state = ksData.state;
      if (!Array.isArray(state)) {
        cdebug("Failed: `ks.state` not `Array`.");
        return;
      }
      return state[0];
    }
    static async waitForGame(timeout = TIMEOUT_OVERRIDE ?? TIMEOUT_DEFAULT) {
      const signals = [sleep(2e3)];
      if (isNil(_UserScript._gameStartSignal) && typeof _UserScript.window.dojo !== "undefined") {
        _UserScript._gameStartSignal = new Promise((resolve2) => {
          _UserScript._gameStartSignalResolver = resolve2;
        });
        _UserScript.window.dojo.subscribe("game/start", () => {
          cdebug("`game/start` signal caught. Fast-tracking script load...");
          mustExist(_UserScript._gameStartSignalResolver)(true);
        });
        _UserScript.window.dojo.subscribe(
          "server/load",
          (saveData) => {
            cinfo(
              "`server/load` signal caught. Looking for Kitten Scientists engine state in save data..."
            );
            const state = _UserScript._tryEngineStateFromSaveData(saveData);
            if (!state) {
              cinfo("The Kittens Game save data did not contain an engine state.");
              return;
            }
            cinfo("Found! Provided save data will be used as seed for next userscript instance.");
            _UserScript._possibleEngineState = state;
          }
        );
      }
      if (!isNil(_UserScript._gameStartSignal)) {
        signals.push(_UserScript._gameStartSignal);
      }
      if (timeout < 0) {
        throw new Error(
          "Unable to find game. Giving up. Maybe the game is not exported at `window.game`?"
        );
      }
      if (_UserScript._isGameLoaded()) {
        return mustExist(_UserScript.window.game);
      }
      cdebug(`Waiting for game... (timeout: ${Math.round(timeout / 1e3)}s)`);
      await Promise.race(signals);
      return _UserScript.waitForGame(timeout - 2e3);
    }
    /**
     * Returns an instance of the userscript in our default configuration.
     *
     * @returns The default userscript instance.
     */
    static getDefaultInstance() {
      const instance = new _UserScript(
        mustExist(_UserScript.window.game),
        mustExist(_UserScript.window.$I),
        localStorage["com.nuclearunicorn.kittengame.language"]
      );
      if (!isNil(_UserScript._possibleEngineState)) {
        try {
          instance.setSettings(_UserScript._possibleEngineState);
        } catch (error2) {
          cerror("The previous engine state could not be processed!", error2);
        }
      }
      instance.installSaveManager();
      return instance;
    }
    static _isGameLoaded() {
      return !isNil(_UserScript.window.game) && !Object.prototype.toString.apply(_UserScript.window.game).includes("HTMLDivElement");
    }
    static get window() {
      try {
        return unsafeWindow;
      } catch (error2) {
        return window;
      }
    }
  };
  /**
   * Stores if we caught the `game/start` signal from the game.
   */
  __publicField(_UserScript, "_gameStartSignal");
  __publicField(_UserScript, "_gameStartSignalResolver");
  __publicField(_UserScript, "_possibleEngineState");
  let UserScript = _UserScript;
  (async () => {
    await UserScript.waitForGame();
    const userScript = UserScript.getDefaultInstance();
    window.kittenScientists = userScript;
    userScript.validateGame();
    userScript.run();
  })().catch(cerror);
});
