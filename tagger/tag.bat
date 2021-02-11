@echo off


REM Use -bWST for white space tagger instead of the broken Mila tagger.
REM This assumes the text has been tokenized before with hebtokenizer.py
java -Xmx1200m -cp trove-2.0.2.jar;morphAnalyzer.jar;opennlp.jar;gnu.jar;chunker.jar;splitsvm.jar;duck1.jar;tagger.jar vohmm.application.BasicTagger ./ lawStrippedTokenized.txt lawStrippedTokenizedTagged.txt -NER -lemma -conll 


:eof
