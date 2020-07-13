const passport = require('passport');
const db = require('../../models');
const { Strategy, ExtractJwt } = require('passport-jwt');

// const optionLessor = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: "lessor",
// }

// const optionOccupant = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: "occupant",
// }

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "Dorm",
}

const jwtStrategyLessor = new Strategy(option, async (payload, done) => {
    const user = await db.Lesson.findOne({ where: { id: payload.id } })
    if (user) {
        done(null, user)
    } else {
        done(null, false)
    }
});

const jwtStrategyOccupant = new Strategy(option, async (payload, done) => {
    const user = await db.Occupant.findOne({ where: { id: payload.id } })
    if (user) {
        done(null, user)
    } else {
        done(null, false)
    }
});



passport.use('jwt-authentication-lessor', jwtStrategyLessor);
passport.use('jwt-authentication-occupant', jwtStrategyOccupant);


