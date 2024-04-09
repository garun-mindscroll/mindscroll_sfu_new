module.exports = (sequelize, Sequelize) => {

    const Chat = sequelize.define("chat", {
        room_key: {
            type: Sequelize.STRING
        },               
        sender: {
            type: Sequelize.STRING
        },
        content_type: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.TEXT
        },
        file_path: {
            type: Sequelize.STRING
        },
        original_file_name: {
            type: Sequelize.STRING
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

    return Chat;
};
