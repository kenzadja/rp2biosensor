from types import SimpleNamespace
from pathlib import Path
from filecmp import cmpfiles
from rp2biosensor.__main__ import run
import os

INPUT_PATH = Path(__file__).resolve().parent/ 'data' / 'input' / 'rp2-results_dmax-16.csv'
OUTPUT_DIR_PATH = Path(__file__).resolve().parent / 'data' / 'output_dir'
OUTPUT_FILE_PATH = '\Users\kebazikabbaj\Desktop\git_test_kenza\rp2biosensor\tests\data\output_file'
test_output_file_path=os.path.join(Path(__file__).resolve().parent , 'data' , 'output_file')

def test_dir_output(tmpdir):
    temp_path = tmpdir / 'dir_case'  # tmpdir scope is session wised
    options = {
        'rp2_results': f'{INPUT_PATH}',
        'opath': f'{temp_path}',
        'otype': 'dir'
        }
    files_to_cmp = [
        'index.html',
        'network.json',
        'css/viewer.css',
        'js/viewer.js'
    ]
    args = SimpleNamespace(**options)
    run(args)
    match, mismatch, errors = cmpfiles(OUTPUT_DIR_PATH, temp_path, files_to_cmp)
    try:
        assert all(item in match  for item in files_to_cmp)
    except AssertionError as e:
        print("Matched Files    : {}".format(match))
        print("Mismatched Files : {}".format(mismatch))
        print("Errors           : {}".format(errors))
        raise e

def test_file_output(tmpdir):
    temp_path = tmpdir / 'file_case'  # tmpdir scope is session wised
    options = {
        'rp2_results': f'{INPUT_PATH}',
        'opath': f'{temp_path / "biosensor.html"}',
        # 'opath': 'toto/biosensor.html',
        'otype': 'file'}
    files_to_cmp = ['biosensor.html']
    args = SimpleNamespace(**options)
    run(args)
    os.system("sed -i 's/\r//g' " + os.path.join(OUTPUT_FILE_PATH,"biosensor.html"))
    print ("sed -i 's/\r//g' " + os.path.join(OUTPUT_FILE_PATH,"biosensor.html"))
    os.system("sed -i 's/\r//g' " + os.path.join(temp_path,"biosensor.html"))
    print ("sed -i 's/\r//g' " + os.path.join(temp_path,"biosensor.html"))
    match, mismatch, errors = cmpfiles(OUTPUT_FILE_PATH, temp_path, files_to_cmp)
    try:
        assert 'biosensor.html' in match
    except AssertionError as e:
        print("Matched Files    : {}".format(match))
        print("Mismatched Files : {}".format(mismatch))
        print("Errors           : {}".format(errors))
        print (OUTPUT_FILE_PATH)
        print (test_output_file_path)
        raise e