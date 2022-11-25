<?php
Namespace app\modules\v1\models;
use http\Exception;
use Yii;
use yii\base\InvalidConfigException;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use yii\web\HttpException;

/**
 * This is the model class for table "quests".
 *
 * @property int $catgory_id
 * @property int $user_id
 * @property string $title
 * @property string $info
 * @property string $about
 * @property string $img
 * @property string $level
 * @property string $timek
 * @property string $datestart
 * @property string $dateend
 * @property string $latitude
 * @property string $longitude
 * @property int $rating
 * @property string $comments
 * @property string $price
 *
 */
class Quest extends ActiveRecord {

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'quests';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'longitude', 'latitude'], 'required'],
            [['longitude','latitude', 'title', 'img', 'level', 'timek', 'datestart', 'dateend', ], 'string', 'max' => 255],
            [['comments', 'info', 'about'], 'string'],
            [['user_id', 'rating', 'catgory_id'], 'integer'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'catgory_id' => 'Catgory ID',
            'user_id' => 'User ID',
            'title' => 'Title',
            'info' => 'Info',
            'about' => 'About',
            'img' => 'Img',
            'level' => 'Level',
            'timek' => 'Timek',
            'datestart' => 'Datestart',
            'dateend' => 'Dateend',
            'latitude' => 'Latitude',
            'longitude' => 'Longitude',
            'rating' => 'Rating',
            'comments' => 'Comments',
            'price' => 'Price',
        ];
    }
}