module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING
        },               
        password: {
            type: Sequelize.STRING
        },
        fname: {
            type: Sequelize.STRING
        },
        lname: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        profile_image: {
            type: Sequelize.STRING
        },        
        timezone: {
            type: Sequelize.STRING
        },
        last_login: {
              type: Sequelize.DATE
        },
        verified_email: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updated_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },
    {timestamps: false}
    );

    return User;
};
