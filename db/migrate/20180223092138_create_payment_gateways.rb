class CreatePaymentGateways < ActiveRecord::Migration[5.1]
  def change
    create_table :payment_gateways do |t|
      t.integer :project_id
      t.float :price_rate
      t.text :domain

      t.timestamps
    end
  end
end
