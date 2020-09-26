# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased]
### Changed
* standardised CHANGELOG to meet [Keep a Changelog](https://keepachangelog.com/nl/1.0.0/)


## [0.5.0] - 2020-09-25

Enhanced documentation and extended API to match development needs.
### Added
* clearified add function in README
* output function: where
### Changed
* split methods file in files maintenance and yielding functions
* fix typos in js-docs


## [0.3.0] - 2020-09-18

Maturing project and extending API to match development needs.
### Added
* travis and coveralls badges
* coding examples in README
* CHANGELOG
* maintenance function: clear
### Changed
* refactored combination, intersection and their helper functions
* punctuation in js-docs


## [0.2.0] - 2020-09-02

A definate name with an extended API.
### Added
* maintenance function: toggle
* output functions: combination, intersection
* unit tests
* automated API documentation
### Changed
* changed name to SnapCollect
* moved API and helper functions to dedicated files


## [0.1.0] - 2020-08-28

First release named ContextualCollection,
a simple working ready-to-use function.
Set-up copied from my-lib.
### Added
* maintenance functions: add, delete, get, has, set
* properties: keyProperty, length
* output functions: entries, keys, values
* demo.html with proofing


[ideas]

* Specify a criterion for acceptance || rejection when initialising,
  the criterion should also play a role in the processing.
* Support for Set-objects in combination/intersection
* subtraction, subtractionFrom
