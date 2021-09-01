# Biggie

Proof of concept for a big number library for floating point arithmetics, utilizing `BigInt` under the hood for high precision and reduction of round-off errors.

A `Biggy` bignumber is represented by a BigInt `coefficient` and `exponent` (decimal). The numeric value is calculated as `coefficient * pow(10, exponent)`.
