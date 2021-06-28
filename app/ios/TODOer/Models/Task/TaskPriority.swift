import Foundation

/**
 Priority of a `Task` entity
 */
class TaskPriority: CodeList, Comparable {
    
    typealias Code = Int
    
    let code: Code
    let name: String
    
    init(code: Code, name: String) {
        self.code = code
        self.name = name
    }
    
    static func == (lhs: TaskPriority, rhs: TaskPriority) -> Bool {
        return lhs.code == rhs.code
    }
    
    static func < (lhs: TaskPriority, rhs: TaskPriority) -> Bool {
        return lhs.code < rhs.code
    }
}
