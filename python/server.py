import zerorpc
import silabas

class SilabasServer(object):
  def process(self, word):
    processed = silabas.process(word)
    return processed

s = zerorpc.Server(SilabasServer())
s.bind("tcp://0.0.0.0:4242")
s.run()
