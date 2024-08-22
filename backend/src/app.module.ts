import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsModule } from './ingredients/ingredients.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { AttendancesModule } from './attendances/attendances.module';
import { DataSource } from 'typeorm';
import { EmployeesModule } from './employees/employees.module';
import { BranchModule } from './branch/branch.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './inventory/inventory.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StockTakingModule } from './stock-taking/stock-taking.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { PromotionsModule } from './promotions/promotions.module';
import { ReplenishmentModule } from './replenishment/replenishment.module';
import { ReportsModule } from './reports/reports.module';
import { PayrollModule } from './payroll/payroll.module';
import { BillsModule } from './bills/bills.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'demo-d-coffee.db',
      autoLoadEntities: true,
      synchronize: true, //true for not production only and not have already database file
      logging: true, //true for check query and error
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'dcoffee',
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   logging: true,
    // }),
    UsersModule,
    IngredientsModule,
    CustomersModule,
    ProductsModule,
    AttendancesModule,
    EmployeesModule,
    BranchModule,
    RolesModule,
    AuthModule,
    InventoryModule,
    StockTakingModule,
    ReceiptsModule,
    PromotionsModule,
    ReplenishmentModule,
    ReportsModule,
    PayrollModule,
    BillsModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
