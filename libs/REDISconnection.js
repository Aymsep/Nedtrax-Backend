const RedisAux = require('ioredis')
const chalk = require('chalk')

const redisOptions = {
    host: process.env.REDIS_URL || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    options: {},
    retry_strategy(options) {
        console.log('[Redis] going to reconnect after: ' + Math.min(options.attempt * 100, 3000))
        return Math.min(options.attempt * 100, 3000)
    }
}

const redisClientAux = new RedisAux(redisOptions)

redisClientAux.on('ready', () => {
    console.log(chalk.blue.bold(`---------- REDIS ENVIRONNEMENT: ------- ${process.env.NODE_ENV} -------`))
    console.log(chalk.green.italic('[REDIS] REDIS is now ready on :', process.env.REDIS_URL))
})

const middlewareCacheClean = () => {
    return (req, res, next) => {
        //console.log("middlewareCacheClean");
        //console.log(req.method);

        if(req.method !== 'GET') {
            let keyFirebaseUid = '_cached_' + req.originalUrl + '_' + res.locals.firebase_uid
            let keyPublic = '_cached_' + req.originalUrl
            
            //console.log('[REDIS] Removing key ' + keyFirebaseUid);
            redisClientAux.del(keyFirebaseUid).then(() => {
                //console.log(result);

                //console.log('[REDIS] Removing key ' + keyPublic);
                redisClientAux.del(keyPublic).then(() => {
                    //console.log(result);
                    next()
                }, () => {
                    //console.error(err);
                    next()
                })
            }, () => {
                //console.error(err);
                next()
            })
        } else {
            next()
        }
    }
}

const cacheData = (keyPrefix,duration=1800) => {
    return async (req, res, next) => {
        const key = `${req.user.id}_${keyPrefix}_${req.params.id}`; // Cache key based on ID
        try {
            const cachedResult = await redisClientAux.get(key);
            if (cachedResult) {
                let resultParsed = JSON.parse(cachedResult)
                res.header('Content-Type', 'application/json');
                res.header('X-Is-Cached', 'Yes');
                res.status(200).json(resultParsed);
                return;
            }
        } catch (err) {
            console.error(`[REDIS] Error retrieving key: ${key}`, err);
            // Continue to generate response if cache fails
        }
        const originalSend = res.send.bind(res);
        res.send = (body) => {
                console.log(`[REDIS] Setting key: ${key}`);
                // Ensure the body is in string format to avoid issues in caching
                redisClientAux.set(key, body, 'EX', duration).catch(err => {
                    console.error(`[REDIS] Error setting key: ${key}`, err);
                });
            originalSend(body);
        };
        next();
    };
};

const deleteCacheData = () => {
    redisClientAux.flush().then(() => {
        return 
    })
}

module.exports = {
    redisClient: redisClientAux.redisClient,
    redisClientAux: redisClientAux,
    cacheData: cacheData,
    middlewareCacheClean: middlewareCacheClean,
    deleteCacheData: deleteCacheData,
    em: redisClientAux
}
