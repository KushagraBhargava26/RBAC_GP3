import json
import os

def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

def save_json(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

def detect_department(source_file, content, role_mappings):
    for department, keywords in role_mappings['keywords'].items():
        if any(keyword in content.lower() for keyword in keywords):
            return department
    
    for department in role_mappings['departments']:
        if department in source_file.lower():
            return department

    return 'general'

def add_metadata_to_chunks(chunks, role_mappings):
    tagged_chunks = []
    department_summary = {}

    for chunk_id, chunk in enumerate(chunks):
        content = chunk['content']
        source_file = chunk['source_file']

        department = detect_department(source_file, content, role_mappings)
        accessible_roles = role_mappings['departments'].get(department, [])

        metadata = {
            'chunk_id': chunk_id,
            'content': content,
            'source': source_file,
            'department': department,
            'accessible_roles': accessible_roles
        }

        tagged_chunks.append(metadata)
        department_summary[department] = department_summary.get(department, 0) + 1

    return tagged_chunks, department_summary

def main():
    chunked_documents_path = '../output/chunked_documents.json'
    role_mappings_path = '../config/role_mappings.json'
    tagged_chunks_path = '../output/tagged_chunks.json'

    chunks = load_json(chunked_documents_path)
    role_mappings = load_json(role_mappings_path)

    tagged_chunks, department_summary = add_metadata_to_chunks(chunks, role_mappings)

    save_json(tagged_chunks, tagged_chunks_path)

    for department, count in department_summary.items():
        print(f"{department}: {count} chunks")

if __name__ == '__main__':
    main()