class ContractorSerializer < ActiveModel::Serializer
  attributes :id, :firstName, :lastName, :email, :phoneNum

  has_many :projects
end
