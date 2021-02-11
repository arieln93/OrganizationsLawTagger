import os
import subprocess
import csv

print('suggestTags.py start process.')
# run the hebtokenizer
subprocess.check_output(
    "python3 hebtokenizer.py < ./tagger.ner/lawStripped.txt > ./tagger.ner/lawStrippedTokenized.txt", shell=True)

# run hebrew part of speech tagger
subprocess.check_output(
    "tag", shell=True, cwd=os.getcwd() + "/tagger.ner")

# adding line numbers and filter all ORG tags
file_path = os.getcwd() + "/tagger.ner/lawStrippedTokenizedTagged.txt"
with open(file_path, 'r', encoding='utf8') as program:
    data = program.readlines()
with open(file_path, 'w', encoding='utf8') as program:
    for (number, line) in enumerate(data):
        if "I_ORG" in line:
            program.write('%d,%s' % (number + 1, line.replace(' ', ',')))

# extracting organizations to the output file
orgs_found = []
file_path = os.getcwd() + "/tagger.ner/lawStrippedTokenizedTagged.txt"
with open(file_path, 'r', encoding='utf8') as program:
    lines = program.readlines()
organization = []
for i in range(0, len(lines) - 1):
    row_data = lines[i].split(',')
    word = row_data[4]
    organization.append(word)
    if i < len(lines) - 1:
        line_num = int(row_data[0])
        word_index = int(row_data[1])
        next_row_data = lines[i + 1].split(',')
        next_line_num = int(next_row_data[0])
        next_word_index = int(next_row_data[1])
        # 3 is the max difference between connected lines
        if (next_line_num - line_num) > 3 or word_index != next_word_index - 1:
            orgs_found.append(" ".join(organization))
            organization = [] 

with open(os.getcwd() + "/orgsFound.json", 'w', encoding='utf8') as program:
    program.write('{"orgNames" : [\"%s\"]}' % ("\",\"".join(orgs_found)))

print('suggestTags.py finished.')
