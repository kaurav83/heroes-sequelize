const yup = require('yup');

module.exports.HERO_SCHEMA = yup.object({
    nickname: yup.string().required('nickname field is required').min(1),
    realName: yup.string().required('realName field is required').min(1),
    originDescription: yup.string().required('originDescription field is required').min(1)
});
