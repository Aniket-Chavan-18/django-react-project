import json
import random
from typing import List, Optional

# Define the TreeNode structure
class TreeNode:
    def __init__(self, val: int, left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None):
        self.val = val
        self.left = left
        self.right = right

# Function to build a binary tree from a list input (level order)
def build_tree(nodes: List[Optional[int]]) -> Optional[TreeNode]:
    if not nodes or nodes[0] is None:
        return None

    root = TreeNode(nodes[0])
    queue = [root]
    i = 1

    while i < len(nodes):
        if len(queue) != 0:
            current = queue.pop(0)
        if i < len(nodes) and nodes[i] is not None:
            current.left = TreeNode(nodes[i])
            queue.append(current.left)
        i += 1
        if i < len(nodes) and nodes[i] is not None:
            current.right = TreeNode(nodes[i])
            queue.append(current.right)
        i += 1

    return root

# Function to generate preorder traversal of a binary tree
def preorder_traversal(root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []
    return [root.val] + preorder_traversal(root.left) + preorder_traversal(root.right)

# Generate 100 test cases
def generate_test_cases(n: int = 100) -> List[dict]:
    test_cases = []
    for _ in range(n):
        size = random.randint(1, 15)
        values = [random.choice([random.randint(0, 100), None]) for _ in range(size)]
        if values[0] is None:
            values[0] = random.randint(0, 100)  # Ensure root is not None
        tree = build_tree(values)
        output = preorder_traversal(tree)
        test_cases.append({
            "input": values,
            "expected_output": output
        })
    return test_cases

# Generate and save the test cases to a file
test_cases = generate_test_cases()
file_path = "preorder_test_cases.json"
with open(file_path, "w") as f:
    json.dump(test_cases, f, indent=2)

