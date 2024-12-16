#!/bin/bash

# Find all TypeScript files
find . -type f -name "*.ts" -o -name "*.tsx" | while read -r file; do
  # Update next-auth/next to next-auth
  sed -i 's/from "next-auth\/next"/from "next-auth"/g' "$file"
  sed -i "s/from 'next-auth\/next'/from 'next-auth'/g" "$file"
  
  # Add 'use client' where needed
  if grep -q "useSession\|signIn\|signOut" "$file"; then
    if ! grep -q "'use client'" "$file"; then
      sed -i '1i\'$'\n'\'use client\''\'$'\n' "$file"
    fi
  fi
done 