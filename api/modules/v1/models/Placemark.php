<?php
Namespace app\modules\v1\models;
use http\Exception;
use Yii;
use yii\base\InvalidConfigException;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use yii\web\HttpException;

/**
 * This is the model class for table "placemarks".
 *
 * @property int $id
 * @property string $user_id
 * @property string $request_id
 * @property string $longitude
 * @property string $latitude
 * @property string $comment
 * @property string $inn
 *
 */
class Placemark extends ActiveRecord {

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'placemarks';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['request_id','user_id', 'longitude', 'latitude'], 'required'],
            [['longitude','latitude', 'inn'], 'string', 'max' => 255],
            [['comment'], 'string'],
            [['user_id','request_id'], 'integer'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'request_id' => 'Request ID',
            'longitude' => 'Longitude',
            'latitude' => 'Latitude',
            'comment' => 'Comment',
            'inn' => 'Inn',
        ];
    }

    public static function markAccept($request)
    {
        $requestMark = Request::findOne(['id' => $request['id']]);
        $placemark = new PlaceMark;
        $placemark->user_id = $requestMark->user_id;
        $placemark->request_id = $requestMark->id;
        $placemark->latitude = $requestMark->latitude;
        $placemark->longitude = $requestMark->longitude;
        $placemark->comment = $requestMark->comment;
        $placemark->inn = $requestMark->inn;
        $placemark->save();
        $requestMark->delete();
        $response = [
            'name' => 'markAccept',
            'message' => 'PlaceMark '.$placemark->latitude.' accepted.',
            'code' => 200,
            'status' => 'success',
            'data' => [
                'id' => $placemark->request_id,
                'latitude' => $placemark->latitude,
                'longitude' => $placemark->longitude,
                'comment' => $placemark->comment
            ],
        ];
        return $response;
    }

    public static function markRemove($request)
    {
        $requestMark = PlaceMark::findOne(['request_id' => $request['id']]);
        $placemark = new Request;
        $placemark->user_id = $requestMark->user_id;
        $placemark->latitude = $requestMark->latitude;
        $placemark->longitude = $requestMark->longitude;
        $placemark->comment = $requestMark->comment;
        $placemark->inn = $requestMark->inn;
        $placemark->save();
        $requestMark->delete();
        $response = [
            'name' => 'markAccept',
            'message' => 'PlaceMark '.$placemark->latitude.' accepted.',
            'code' => 200,
            'status' => 'success',
            'data' => [
                'id' => $placemark->id,
                'latitude' => $placemark->latitude,
                'longitude' => $placemark->longitude,
                'comment' => $placemark->comment
            ],
        ];
        return $response;
    }
}