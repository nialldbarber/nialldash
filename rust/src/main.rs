/**
 * compact()
 *
 * @param array Array<any>
 *
 * Creates an array with all falsey
 * values removed. The values false,
 * null, 0, "", undefined, and NaN are falsey.
 *
 * E.G.
 * compact([1, 2, 3, 4]) => [1, 2, 3, 4]
 * compact([0, 1, false, 2, '', 3]) => [1, 2, 3]
 */

pub fn compact(array: Vec<i32>) -> Vec<i32> {
    let mut new_array: Vec<i32> = Vec::new();

    for i in array {
        if i != 0 {
            new_array.push(i);
        }
    }

    new_array
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_compact() {
        assert_eq!(compact(vec![1, 2, 3, 4]), vec![1, 2, 3, 4]);
        assert_eq!(compact(vec![0, 1, 2, 3]), vec![1, 2, 3]);
        assert_eq!(compact(vec![0, 1, 2, 3, 0, 0, 0]), vec![1, 2, 3]);
    }
}

fn main() {
    println!("Hello, world!");
}
