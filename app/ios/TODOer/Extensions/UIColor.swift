import UIKit

extension UIColor {
    
    /**
     Inialize a new color from a color hex string.
     - parameter hex 6-digit hex color string
     - returns an `UIColor`
     */
    convenience init?(hex: String) {
        guard hex.count == 6 else {
            return nil
        }
        
        let scanner = Scanner(string: hex)
        var hexNumber: UInt64 = 0

        if scanner.scanHexInt64(&hexNumber) {
            let r, g, b: CGFloat
            r = CGFloat((hexNumber & 0xff000000) >> 24) / 255
            g = CGFloat((hexNumber & 0x00ff0000) >> 16) / 255
            b = CGFloat((hexNumber & 0x0000ff00) >> 8) / 255

            self.init(red: r, green: g, blue: b, alpha: 1.0)
            return
        }

        return nil
    }
}
