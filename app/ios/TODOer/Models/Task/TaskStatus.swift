import Foundation

/**
 Status of a `Task` entity
 */
class TaskStatus: CodeList, Comparable {
    
    typealias Code = String
    
    let code: Code
    let name: String
    
    init(code: Code, name: String) {
        self.code = code
        self.name = name
    }
    
    static func == (lhs: TaskStatus, rhs: TaskStatus) -> Bool {
        return lhs.code == rhs.code
    }
    
    static func < (lhs: TaskStatus, rhs: TaskStatus) -> Bool {
        return lhs.code < rhs.code
    }
}
