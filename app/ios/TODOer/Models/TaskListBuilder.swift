import UIKit

/**
 This class creates `TaskList` objects. It is implemented according to the Builder pattern.
 */
class TaskListBuilder {
    private(set) var id = -1
    private(set) var title: String?
    private(set) var color: UIColor?
    private(set) var type: TaskListType = .collection
    private(set) var isDefaultCollection = false
    private(set) var isEditable = true
    private(set) var isDeletable = true
    
    convenience init(template: TaskList) {
        self.init()
        self.id = template.id
        self.title = template.title
        self.color = template.color
        self.type = template.type
        self.isDefaultCollection = template.isDefaultCollection
        self.isEditable = template.isEditable
        self.isDeletable = template.isDeletable
    }
    
    func title(_ title: String?) -> TaskListBuilder {
        self.title = title
        return self
    }
    
    func color(_ color: UIColor?) -> TaskListBuilder {
        self.color = color
        return self
    }
    
    func colorHex(_ colorHex: String?) -> TaskListBuilder {
        // swiftlint:disable force_unwrapping
        self.color = colorHex != nil ? UIColor(hex: colorHex!) : nil
        // swiftlint:enable force_unwrapping
        return self
    }
    
    func isDefaultCollection(_ isDefaultCollection: Bool) -> TaskListBuilder {
        self.isDefaultCollection = isDefaultCollection
        return self
    }
    
    func build() -> TaskList {
        return TaskList(id: id,
                        title: title,
                        color: color,
                        type: type,
                        isDefaultCollection: isDefaultCollection,
                        isEditable: isEditable,
                        isDeletable: isDeletable)
    }
}
