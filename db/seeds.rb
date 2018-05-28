# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Resolution.create(name: "Add new Collaborator")
Resolution.create(name: "Remove Collaborator")
Resolution.create(name: "Dilute")

NotificationType.create(notification_content: "Digital Contract")
NotificationType.create(notification_content: "Add Collaborator")
NotificationType.create(notification_content: "Remove Collaborator")
NotificationType.create(notification_content: "Dilute")
NotificationType.create(notification_content: "Bid Overflow")