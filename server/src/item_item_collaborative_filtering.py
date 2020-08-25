import sys, os
import pandas as pd
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse

#------------------
# LOAD THE DATASET
#------------------

data = pd.read_csv(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "csvs", "child-purchase.csv")))

# Create a new dataframe without the user ids.
data_items = data.drop('child', 1)
data_items = data_items.fillna(0)

#------------------------
# ITEM-ITEM CALCULATIONS
#------------------------

# As a first step we normalize the user vectors to unit vectors.

# magnitude = sqrt(x2 + y2 + z2 + ...)
magnitude = np.sqrt(np.square(data_items).sum(axis=1))

# unitvector = (x / magnitude, y / magnitude, z / magnitude, ...)
data_items = data_items.divide(magnitude, axis='index')

def calculate_similarity(data_items):
    """Calculate the column-wise cosine similarity for a sparse
    matrix. Return a new dataframe matrix with similarities.
    """
    data_sparse = sparse.csr_matrix(data_items)
    similarities = cosine_similarity(data_sparse.transpose())
    sim = pd.DataFrame(data=similarities, index= data_items.columns, columns= data_items.columns)
    return sim

# Build the similarity matrix
data_matrix = calculate_similarity(data_items)


#------------------------
# USER-ITEM CALCULATIONS
#------------------------

# Construct a new dataframe with the 10 closest neighbours (most similar)
# for each artist.
data_neighbours = pd.DataFrame(index=data_matrix.columns, columns=range(1,11))
for i in xrange(0, len(data_matrix.columns)):
    data_neighbours.ix[i,:10] = data_matrix.ix[0:,i].sort_values(ascending=False)[:10].index

user = sys.argv[1]
user_index = data[data.child == user].index.tolist()[0]

known_user_likes = data_items.ix[user_index]
known_user_likes = known_user_likes[known_user_likes >0].index.values

# Construct the neighbourhood from the most similar items to the
# ones our user has already liked.
most_similar_to_likes = data_neighbours.ix[known_user_likes]
similar_list = most_similar_to_likes.values.tolist()
similar_list = list(set([item for sublist in similar_list for item in sublist]))
neighbourhood = data_matrix[similar_list].ix[similar_list]

# A user vector containing only the neighbourhood items and
# the known user likes.
user_vector = data_items.ix[user_index].ix[similar_list]

# Calculate the score.
score = neighbourhood.dot(user_vector).div(neighbourhood.sum(axis=1))

# Drop the known likes.
score = score.drop(known_user_likes)

results = score.nlargest(20)
#print known_user_likes
#print results
print results.keys().tolist()
