class AddSalaryToCareers < ActiveRecord::Migration
  def change
    add_column :careers, :sal2003, :float
    add_column :careers, :sal2004, :float
    add_column :careers, :sal2005, :float
    add_column :careers, :sal2006, :float
    add_column :careers, :sal2007, :float
    add_column :careers, :sal2008, :float
    add_column :careers, :sal2009, :float
    add_column :careers, :sal2010, :float
    add_column :careers, :sal2011, :float
    add_column :careers, :sal2012, :float
    add_column :careers, :sal2013, :float
  end
end
