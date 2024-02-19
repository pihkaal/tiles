using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Puzzle : MonoBehaviour
{
  [SerializeField] private Sprite tileSprite;
  [SerializeField] private int size = 3;
  [SerializeField] [Range(0f, 1f)] private float widthRatio = .95f;
  
  private List<List<GameObject>> tiles = new List<List<GameObject>>();

  private void Start()
  {
    SpawnTiles();
    FitToScreen();
  }

  private void SpawnTiles()
  {
    var offsetX = (float)size / 2 - .5f;
    for (int y = 0; y < size; y++)
    {
      var row = new List<GameObject>();
      for (int x = 0; x < size; x++)
      {
        var tile = new GameObject($"({x}, {y})");
        tile.transform.parent = transform;
        tile.transform.position = new Vector3(
          .5f * x + .5f * y - offsetX,
          .25f * x - .25f * y,
          0
        );

        var renderer = tile.AddComponent<SpriteRenderer>();
        renderer.sprite = tileSprite;
        renderer.sortingOrder = (y + 1) * size - x;

        row.Add(tile);
      }

      tiles.Add(row);
    }
  }

  private void FitToScreen()
  {
    var bounds = tiles[0][0].GetComponent<SpriteRenderer>().bounds;
    Vector3 start = Camera.main.WorldToScreenPoint(new Vector3(bounds.min.x, 0, 0));
    Vector3 end = Camera.main.WorldToScreenPoint(new Vector3(bounds.max.x, 0, 0));
    
    float tileWidth = end.x - start.x;
    float screenWidth = Screen.width * widthRatio;
    float puzzleWidth = tileWidth * size;
    
    float ratio = screenWidth / puzzleWidth;
    transform.localScale = new Vector3(ratio, ratio, 1);
  }
}
