import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1591162302607 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    unsigned: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'username',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: "created_at",
                    type: "datetime",
                },
                {
                    name: "updated_at",
                    type: "datetime",
                    isNullable: true,
                },
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}
