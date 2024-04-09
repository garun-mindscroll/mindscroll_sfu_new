module.exports = (sequelize, Sequelize) => {

    const Room = sequelize.define("room", {
        room_key: {
            type: Sequelize.STRING
        },               
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        start_date_time: {
              type: Sequelize.DATE
        },
        duration: {
              type: Sequelize.INTEGER
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

    return Room;
};
