import UIKit

/**
 This class creates `TaskList` objects. It is implemented according to the Builder pattern.
 */
class TaskListBuilder {
    private(set) var id: TaskList.ID?
    private(set) var title: String?
    private(set) var color: UIColor?
    private(set) var listType: TaskListType?
    // swiftlint:disable discouraged_optional_boolean
    private(set) var isDefaultCollection: Bool?
    // swiftlint:enable discouraged_optional_boolean
    
    convenience init(template: TaskList) {
        self.init()
        self.id = template.id
        self.title = template.title
        self.color = template.color
        self.listType = template.listType
        self.isDefaultCollection = template.isDefaultCollection
    }
    
    func id(_ id: TaskList.ID?) -> TaskListBuilder {
        self.id = id
        return self
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
    
    func listType(_ listType: TaskListType?) -> TaskListBuilder {
        self.listType = listType
        return self
    }
    
    // swiftlint:disable discouraged_optional_boolean
    func isDefaultCollection(_ isDefaultCollection: Bool?) -> TaskListBuilder {
        self.isDefaultCollection = isDefaultCollection
        return self
    }
    // swiftlint:enable discouraged_optional_boolean
    
    func build() -> TaskList {
        return TaskList(id: id ?? -1,
                        title: title,
                        color: color,
                        listType: listType ?? .collection,
                        isDefaultCollection: isDefaultCollection ?? false)
    }
}
