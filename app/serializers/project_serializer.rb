class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :cost, :employees, :contractor_id

  belongs_to :contractor
end
