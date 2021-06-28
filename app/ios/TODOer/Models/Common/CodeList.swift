import Foundation

/**
 Protocol of a code list entity
 */
protocol CodeList: Equatable {
    associatedtype Code
    
    var code: Code { get }
    var name: String { get }
}
