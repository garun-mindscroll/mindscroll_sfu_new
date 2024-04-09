module.exports = (sequelize, Sequelize) => {

    const Recording = sequelize.define("recording", {
        room_id: {
            type: Sequelize.INTEGER
        },               
        path: {
            type: Sequelize.TEXT
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

    return Recording;
};
