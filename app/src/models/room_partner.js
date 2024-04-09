module.exports = (sequelize, Sequelize) => {
    const Room_Partner = sequelize.define("room_partner", {
        room_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },  
        is_organizer: {
              type: Sequelize.BOOLEAN,
              defaultValue: false
        },
        socket_id: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
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

    return Room_Partner;
};