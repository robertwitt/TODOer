import UIKit

/// Types of task lists
enum TaskListType: String {
    case collection = "COLLECTION"
    case myDay = "MY_DAY"
    case tomorrow = "TOMORROW"
}

/**
 A task list is listing and grouping multiple tasks together.
 There a multiple types, the ordinary task collections where tasks are assigned to, and so-called views. Tasks are not assigned to such views directly but implicitly due to view-specific rules. For example, the My Day view is listing tasks that are planned for my day or due today.
 */
class TaskList: Identifiable, Equatable {
    
    typealias ID = Int
    
    let id: Int
    let title: String?
    let color: UIColor?
    let type: TaskListType
    let isDefaultCollection: Bool
    let isEditable: Bool
    let isDeletable: Bool
    
    init(id: ID, title: String?, color: UIColor?, type: TaskListType, isDefaultCollection: Bool, isEditable: Bool, isDeletable: Bool) {
        self.id = id
        self.title = title
        self.color = color
        self.type = type
        self.isDefaultCollection = isDefaultCollection
        self.isEditable = isEditable
        self.isDeletable = isDeletable
    }
    
    static func == (lhs: TaskList, rhs: TaskList) -> Bool {
        return lhs.id == rhs.id
    }
}
