## v1.0.0, 2018-03-20

* Initial public launch


In order to test randomness, the **randomly selects a winner** test calls eventRaffleWithTwoPlayers 20 times. 

So, we increase the EventEmitter.defaultMaxListeners ...
```
require('events').EventEmitter.defaultMaxListeners = 30;
```

... to prevent the following error message when running `npm run test`    

```
(node:78406) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 data listeners added. Use emitter.setMaxListeners() to increase limit
```

We'll make an assumption that the random number generator would award at least 10% of the jackpots to each player.

If not, the **randomly selects a winner** test will fail.

## Purpose

This document will list tagged release versions and some associated release notes. 