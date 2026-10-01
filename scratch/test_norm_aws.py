import re

def normalize_aws_grade(s):
    if not s:
        return s
    s = s.strip()
    s = re.sub(r'^(?:AWS(?:/SFA)?|SFA)\s*(?:A?[\d\.]+)?\s*[:\-\s/]*', '', s, flags=re.I).strip()
    upper = s.upper()
    replacements = {
        'LSI': 'LSi',
        'CUSI-A': 'CuSi-A',
        'CUNI': 'CuNi',
        'CUAL-A2': 'CuAl-A2',
        'CUSN-A': 'CuSn-A',
        'NICR-3': 'NiCr-3',
        'NICRMO-3': 'NiCrMo-3',
        'NICRMO-4': 'NiCrMo-4',
        'NICRMO-13': 'NiCrMo-13',
        'NI-CI': 'Ni-CI',
        'NIFE-CI': 'NiFe-CI',
        'COCR-A': 'CoCr-A',
        'COCR-B': 'CoCr-B',
        'COCR-E': 'CoCr-E',
        'CUP-2': 'CuP-2',
        'CUP-3': 'CuP-3',
        'CUP-5': 'CuP-5',
        'AG-1': 'Ag-1',
        'AG-2': 'Ag-2',
        'AG-7': 'Ag-7',
        'AG-28': 'Ag-28',
        'AG-36': 'Ag-36',
    }
    for k, v in replacements.items():
        if k in upper:
            upper = upper.replace(k, v)
    return upper

tests = ['e308l-16', 'er308lsi', 'AWS A5.4 E310-16', 'eni-ci', 'enife-ci', 'er70s-6', 'bcup-2', 'bag-7', 'ernicr-3']
for t in tests:
    print(f"{t} -> {normalize_aws_grade(t)}")
