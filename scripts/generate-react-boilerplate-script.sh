#!/bin/bash

# Check if directory argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

directory="$1"

# Check if directory exists
if [ ! -d "$directory" ]; then
    echo "Error: Directory '$directory' not found"
    exit 1
fi

# Process each file in the directory
find "$directory" -type f -name "*.js" -o -name "*.jsx" -o -name "*.tsx" | while read -r file; do
    # Get filename without extension and directory path
    filename=$(basename "$file")
    component_name="${filename%.*}"
    
    # Convert filename to PascalCase if it contains hyphens or underscores
    component_name=$(echo "$component_name" | sed -E 's/(^|[-_])([a-z])/\U\2/g')
    
    # Check if file is empty or doesn't contain React boilerplate
    if [ ! -s "$file" ] || ! grep -q "import.*styled" "$file"; then

        # Generate boilerplate code
        cat > "$file" << EOL
import React from 'react';

const $component_name = () => {
    return (
        <div>
            {/* Add your component content here */}
        </div>
    );
};

export {$component_name};
EOL
        
        echo "Added boilerplate to $file"
    else
        echo "Skipping $file - already contains content"
    fi
done

echo "Boilerplate generation complete!"
